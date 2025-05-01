"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Mermaid from "@/components/ui/mermaid";
import CodeBlock from "@/components/ui/code-block";

// PID gain settings
const pidGains = {
  roll: { P: 0.65, I: 0.035, D: 0.023 },
  pitch: { P: 0.65, I: 0.035, D: 0.023 },
  yaw: { P: 0.85, I: 0.045, D: 0.0 },
};

// Architecture diagram in Mermaid syntax
const architectureDiagram = `
graph TD
    A[Smartphone App] -->|Bluetooth| B[CC256 BT Module]
    B -->|HCI UART| C[STM32 Microcontroller]
    C -->|PWM| D[H-Bridge Drivers]
    D -->|Current| E[Linear Actuators]
    E -->|Mechanical Motion| F[Telescopic Arms]
    
    G[Remote Control] -->|RF| H[Pixhawk Receiver]
    H -->|PPM| I[Pixhawk Flight Controller]
    I -->|PWM| J[ESCs]
    J -->|Current| K[Motors]
    
    L[Sensors] -->|I2C/SPI| I
    
    C -.->|Status| I
`;

// Code snippets
const codeSnippets = [
  {
    title: "Bluetooth Initialization",
    code: `
// Initialize the CC256x Bluetooth module
bool init_cc256x() {
  // Configure HCI UART
  uart_config_t uart_config = {
    .baud_rate = 115200,
    .data_bits = UART_DATA_8_BITS,
    .parity = UART_PARITY_DISABLE,
    .stop_bits = UART_STOP_BITS_1,
    .flow_ctrl = UART_HW_FLOWCTRL_CTS_RTS
  };
  
  uart_param_config(UART_NUM_1, &uart_config);
  uart_set_pin(UART_NUM_1, TX_PIN, RX_PIN, RTS_PIN, CTS_PIN);
  uart_driver_install(UART_NUM_1, BUF_SIZE * 2, BUF_SIZE * 2, 0, NULL, 0);
  
  // Send HCI reset command
  uint8_t hci_reset_cmd[] = { 0x01, 0x03, 0x0C, 0x00 };
  uart_write_bytes(UART_NUM_1, (const char*)hci_reset_cmd, sizeof(hci_reset_cmd));
  
  // Wait for command complete event
  uint8_t buf[64];
  int len = uart_read_bytes(UART_NUM_1, buf, sizeof(buf), 1000 / portTICK_PERIOD_MS);
  
  // Verify command complete event for HCI reset
  if (len > 6 && buf[0] == 0x04 && buf[1] == 0x0E && buf[3] == 0x03 && buf[4] == 0x0C && buf[5] == 0x00) {
    return true;
  }
  
  return false;
}`,
  },
  {
    title: "Arm Extension Control",
    code: `
// Control arm extension based on input percentage (0-100%)
void extend_arms(uint8_t percentage) {
  // Limit input range
  if (percentage > 100) percentage = 100;
  
  // Calculate PWM duty cycle (1000-2000 µs)
  uint16_t pulse_width = 1000 + (percentage * 10);
  
  // Apply PWM to actuator channels
  for (int i = 0; i < NUM_ARMS; i++) {
    // Set direction pin based on extension
    GPIO_WriteBit(ACTUATOR_DIR_PORT, ACTUATOR_DIR_PIN[i], percentage > last_percentage[i] ? Bit_SET : Bit_RESET);
    
    // Set PWM value for the actuator
    TIM_SetCompare1(ACTUATOR_TIM[i], pulse_width);
  }
  
  // Store for next comparison
  last_percentage = percentage;
}`,
  },
  {
    title: "PID Control Settings",
    code: `
// PID controller configuration for flight stabilization
void configure_pid_controllers() {
  // Roll PID
  pid_roll.kp = ${pidGains.roll.P}f;
  pid_roll.ki = ${pidGains.roll.I}f;
  pid_roll.kd = ${pidGains.roll.D}f;
  pid_roll.imax = 50.0f;  // Integral windup guard
  
  // Pitch PID
  pid_pitch.kp = ${pidGains.pitch.P}f;
  pid_pitch.ki = ${pidGains.pitch.I}f;
  pid_pitch.kd = ${pidGains.pitch.D}f;
  pid_pitch.imax = 50.0f;
  
  // Yaw PID
  pid_yaw.kp = ${pidGains.yaw.P}f;
  pid_yaw.ki = ${pidGains.yaw.I}f;
  pid_yaw.kd = ${pidGains.yaw.D}f;
  pid_yaw.imax = 50.0f;
  
  // Different PID settings for extended arms mode
  if (arms_extended) {
    // When arms are extended, we need different tuning
    pid_roll.kp *= 0.85f;  // Reduce gain as moment of inertia increases
    pid_pitch.kp *= 0.85f;
    
    // Adjust derivative gain to compensate for slower response
    pid_roll.kd *= 1.2f;
    pid_pitch.kd *= 1.2f;
  }
}`,
  },
];

export default function Software() {
  const architectureRef = useRef(null);
  const codeRef = useRef(null);
  const isArchitectureInView = useInView(architectureRef, { once: true, amount: 0.2 });
  const isCodeInView = useInView(codeRef, { once: true, amount: 0.1 });

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Software Architecture</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            The software that powers L.I.S.A.'s unique telescopic arm system and flight controls.
          </p>
        </div>
      </div>

      {/* Architecture Diagram Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={architectureRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isArchitectureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-10">System Architecture</h2>
            
            <Card className="p-8 bg-[#252525] rounded-2xl shadow-lg mb-8">
              <Mermaid chart={architectureDiagram} />
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Control Path</h3>
                <p className="text-gray-300">
                  The control system follows a multi-layered approach, with arm extension controlled via smartphone 
                  over Bluetooth, while flight dynamics are handled by the Pixhawk controller. 
                  This separation ensures reliable flight performance even during arm adjustment.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Communication Protocols</h3>
                <p className="text-gray-300">
                  We implemented standard communication protocols (UART, I2C, SPI) for component interfacing,
                  with a custom messaging protocol over Bluetooth to enable precise arm control.
                  The Pixhawk uses the MAVLink protocol for telemetry and status monitoring.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Code Snippets Section */}
      <section className="py-16 bg-[#222222]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={codeRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isCodeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-10">Key Implementation Details</h2>
            
            <div className="space-y-12">
              {codeSnippets.map((snippet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isCodeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-2xl font-semibold mb-4">{snippet.title}</h3>
                  <Card className="bg-[#1e1e1e] rounded-xl overflow-hidden">
                    <div className="p-6">
                      <CodeBlock code={snippet.code} language="c" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PID Tuning Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">PID Tuning Results</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            After migrating to the Pixhawk, extensive PID tuning was performed to achieve
            optimal flight performance with both retracted and extended arms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {Object.entries(pidGains).map(([axis, gains]) => (
              <Card key={axis} className="p-6 bg-[#252525] rounded-2xl">
                <h3 className="text-xl font-semibold mb-4 capitalize">{axis} Axis</h3>
                <div className="space-y-2">
                  {Object.entries(gains).map(([param, value]) => (
                    <div key={param} className="flex justify-between items-center">
                      <span className="text-gray-300">K{param}:</span>
                      <span className="font-mono text-[#2563eb] font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-12">
            <p className="text-gray-300 italic mb-8">
              "Finding the right PID values for the extended arm configuration required careful
              attention to the changed dynamics and moment of inertia."
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Explore the Design Process</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            See how we designed and iteratively improved the telescopic arm mechanism.
          </p>
          <a href="/design" className="btn-primary">
            View Design Gallery
          </a>
        </div>
      </section>
    </div>
  );
} 