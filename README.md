# 🛡️ SENTINEL SOC — CompTIA Security+ (SY0-701) Cyber Defense & Exam Simulator

**SENTINEL SOC** is a zero-dependency, 60fps browser-based cyber defense game and exam simulator built to help you master the **CompTIA Security+ (SY0-701)** certification.

## ✨ Key Features

- **All 5 Official SY0-701 Exam Domains Covered**:
  - **1.0 General Security Concepts (12%)**: Security controls, Zero Trust Architecture (PDP/PEP), PKI, OCSP Stapling, Post-Quantum Cryptography (PQC), TPM vs. HSM, salting/key stretching, and deception technologies.
  - **2.0 Threats, Vulnerabilities & Mitigations (22%)**: APTs, MFA Fatigue / Push Bombing, Watering Hole attacks, TOCTOU race conditions, SQLi prepared statements, Living-off-the-Land (LotL), VLAN hopping, HSTS, DHCP snooping, and SBOMs.
  - **3.0 Security Architecture (18%)**: Cloud Shared Responsibility Matrix, Service Mesh, CASB, SASE, Data Diodes, Tokenization vs. Masking, Hot/Warm/Cold sites, Differential vs. Incremental backups, Reverse Proxies, and RAID levels.
  - **4.0 Security Operations (28%)**: WPA3-Enterprise (802.1X/RADIUS), Credentialed vulnerability scans, SCAP/CVSS, SIEM vs. SOAR, SAML/OIDC/OAuth, Just-in-Time (JIT) PAM, NIST Incident Response phases, RFC 3227 Order of Volatility, Chain of Custody, and SPF/DKIM/DMARC.
  - **5.0 Security Program Management & Oversight (20%)**: Quantitative risk (`SLE = AV × EF`, `ALE = SLE × ARO`), Risk strategies, BIA metrics (RPO vs. RTO), ISA/SLA/MOU agreements, GDPR Data Controller vs. Processor, and Unknown/Known environment pentesting.
- **3 Interactive Performance-Based Question (PBQ) Labs**:
  1. **Perimeter Firewall ACL Remediation**: Configure stateful top-to-bottom `ALLOW`/`DENY` rules and port mappings.
  2. **SIEM Log Forensics & Attack Identification**: Triage `nginx`, `apache`, and `PowerShell` logs for XSS, Path Traversal, and Fileless LotL attacks.
  3. **Zero Trust & Secure Zone Architecture Matching**: Match `TACACS+`, `LDAPS (636)`, `Screened Subnet (DMZ)`, and `STIX/TAXII` standards.
- **Live 60fps Threat Radar & SOAR Countermeasures**:
  - Watch real-time packet telemetry across your enterprise topology on an HTML5 `<canvas>`.
  - Earn **SOC Credits** for streaks and spend them on **Deep Packet Filter (50/50)**, **Threat Intel Hints**, and **Hotfix SLA Patches**.
- **Spaced Repetition & Weak-Spot Targeting**:
  - Automatically tracks accuracy across all 5 domains, calculates a simulated **0–900 Sec+ score** (750 passing), and prioritizes missed or unseen scenarios.
- **Acronym, Protocol & Port Rapid Reference Codex**:
  - Instant live search across high-yield CompTIA Security+ acronyms, formulas, and network ports.

## 🚀 Getting Started

No build step or dependencies required! Simply open `index.html` in any modern web browser:

```bash
# Or serve locally with any static server
npx serve .
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `1` – `4` | Select answer option |
| `Enter` / `Space` | Advance to next incident |
| `F` | Activate **Deep Packet Filter** (eliminates 2 distractors) |
| `T` | Activate **Threat Intel** (reveals CompTIA Exam Tip early) |
| `R` | Activate **Hotfix Patch** (+25% Network Integrity) |
