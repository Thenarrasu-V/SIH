import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import './organization.css';

const OrganizationPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [scanStarted, setScanStarted] = useState(false);
  const [scanResults, setScanResults] = useState([]);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [currentCheckIndex, setCurrentCheckIndex] = useState(0);

  const industryChecks = {
    finance: [
      { check: "Encryption Policies", isSafe: true, detail: "" },
      { check: "Data Backup Procedures", isSafe: true, detail: "" },
      { check: "Firewall Configuration", isSafe: false, detail: "The firewall is disabled, making your system vulnerable to external attacks. Mitigation Strategy: Enable the firewall through your system settings to block unauthorized access." },
      { check: "Access Controls", isSafe: true, detail: "" },
      { check: "Multi-factor Authentication", isSafe: false, detail: "Multi-factor authentication is not enabled, increasing the risk of unauthorized access. Mitigation Strategy: Enable multi-factor authentication for an added layer of security." },
      { check: "Intrusion Detection Systems", isSafe: true, detail: "" },
      { check: "Audit Logs", isSafe: true, detail: "" },
      { check: "Third-party Risk Management", isSafe: true, detail: "" },
      { check: "Compliance with Regulations", isSafe: true, detail: "" },
      { check: "Payment Security", isSafe: true, detail: "" },
      { check: "Customer Data Protection", isSafe: true, detail: "" },
      { check: "Disaster Recovery Plan", isSafe: true, detail: "" }
    ],
    education: [
      { check: "Student Data Privacy", isSafe: true, detail: "" },
      { check: "E-learning Platform Security", isSafe: true, detail: "" },
      { check: "Network Monitoring", isSafe: false, detail: "Network monitoring is not properly configured, potentially missing suspicious activities. Mitigation Strategy: Implement comprehensive network monitoring tools to detect and respond to potential threats." },
      { check: "Device Management", isSafe: true, detail: "" },
      { check: "Firewall Configuration", isSafe: false, detail: "The firewall is not properly configured, which can leave your network exposed. Mitigation Strategy: Review and configure your firewall settings to block unauthorized access." },
      { check: "Access Controls", isSafe: true, detail: "" },
      { check: "Backup and Recovery", isSafe: true, detail: "" },
      { check: "Incident Response Plan", isSafe: true, detail: "" },
      { check: "Third-party Vendor Security", isSafe: true, detail: "" },
      { check: "Compliance with Educational Regulations", isSafe: true, detail: "" },
      { check: "Software Updates", isSafe: true, detail: "" },
      { check: "Antivirus Protection", isSafe: true, detail: "" }
    ],
    technical: [
      { check: "Code Repositories", isSafe: true, detail: "" },
      { check: "Continuous Integration/Continuous Deployment (CI/CD)", isSafe: true, detail: "" },
      { check: "Security Patches", isSafe: false, detail: "Security patches are outdated or missing, increasing vulnerability. Mitigation Strategy: Regularly update and apply security patches to all systems and software." },
      { check: "Source Code Review", isSafe: true, detail: "" },
      { check: "Penetration Testing", isSafe: false, detail: "Penetration testing has not been conducted recently, leaving potential vulnerabilities unaddressed. Mitigation Strategy: Schedule regular penetration tests to identify and fix security weaknesses." },
      { check: "Access Controls", isSafe: true, detail: "" },
      { check: "Firewall Configuration", isSafe: true, detail: "" },
      { check: "Intrusion Detection Systems", isSafe: true, detail: "" },
      { check: "Audit Logs", isSafe: true, detail: "" },
      { check: "Software Updates", isSafe: true, detail: "" },
      { check: "Antivirus Protection", isSafe: true, detail: "" },
      { check: "Backup and Recovery", isSafe: true, detail: "" }
    ],
    gaming: [
      { check: "Player Data Security", isSafe: true, detail: "" },
      { check: "Payment Processing Security", isSafe: true, detail: "" },
      { check: "Network Monitoring", isSafe: false, detail: "Network monitoring is insufficient, potentially missing important threats. Mitigation Strategy: Enhance network monitoring to detect and address potential security issues." },
      { check: "Game Server Security", isSafe: true, detail: "" },
      { check: "DDoS Protection", isSafe: true, detail: "" },
      { check: "Access Controls", isSafe: true, detail: "" },
      { check: "Encryption Policies", isSafe: true, detail: "" },
      { check: "Firewall Configuration", isSafe: false, detail: "Firewall settings are not configured properly, exposing the system to attacks. Mitigation Strategy: Review and configure firewall settings to ensure protection against unauthorized access." },
      { check: "Incident Response Plan", isSafe: true, detail: "" },
      { check: "Compliance with Gaming Regulations", isSafe: true, detail: "" },
      { check: "Anti-cheat Systems", isSafe: true, detail: "" },
      { check: "Backup and Recovery", isSafe: true, detail: "" }
    ],
  };

  useEffect(() => {
    if (scanStarted && currentCheckIndex < scanResults.length) {
      const timer = setTimeout(() => {
        setCurrentCheckIndex(prevIndex => prevIndex + 1);
        if (currentCheckIndex === scanResults.length - 1) {
          setScanCompleted(true);
        }
      }, 1000); // Simulate a delay for each check

      return () => clearTimeout(timer);
    }
  }, [scanStarted, currentCheckIndex, scanResults.length]);

  const handleIndustryChange = (event) => {
    const selectedIndustry = event.target.value;
    setSelectedIndustry(selectedIndustry);
    setScanStarted(false);
    setScanResults([]);
    setScanCompleted(false);
    setCurrentCheckIndex(0);
  };

  const handleScanClick = () => {
    setScanStarted(true);
    const checks = industryChecks[selectedIndustry] || [];
    setScanResults(checks);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(16);
    doc.text(`Scan Results for ${selectedIndustry} Industry`, 10, 10);
    doc.setFontSize(12);

    let yOffset = 20;
    scanResults.forEach((result, index) => {
      if (index > 0) {
        yOffset += 10;
      }
      doc.text(
        `${result.check}: ${result.isSafe ? "✔ Safe" : "✖ Unsafe"}`,
        10,
        yOffset
      );
      yOffset += 10;
      if (!result.isSafe) {
        doc.setFontSize(10);
        const text = `${result.detail}`;
        doc.text(text, 10, yOffset, { maxWidth: 180 });
        yOffset += text.split(' ').length * 5; // Estimate text height
        doc.setFontSize(12);
      }
    });

    doc.save(`${selectedIndustry}_Scan_Results.pdf`);
  };

  return (
    <div className="organization-container">
      <div className="dropdown-container">
        <h1 className="page-title">Select Industry Type</h1>
        <select
          className="industry-dropdown"
          onChange={handleIndustryChange}
          value={selectedIndustry}
        >
          <option value="">Select Industry</option>
          <option value="finance">Finance</option>
          <option value="education">Education</option>
          <option value="technical">Technical</option>
          <option value="gaming">Gaming</option>
        </select>
      </div>

      {selectedIndustry && (
        <div className="action-buttons">
          <button className="customize-button">Customize</button>
          <button className="scan-button" onClick={handleScanClick}>Scan</button>
        </div>
      )}

      {scanStarted && (
        <div className="scan-results">
          {scanResults.map((result, index) => (
            <div className="scan-item" key={index}>
              <span>{result.check}</span>
              <span className={result.isSafe ? 'tick' : 'cross'}>
                {currentCheckIndex > index ? (result.isSafe ? '✔' : '✖') : <span className="loading-dots">...</span>}
              </span>
            </div>
          ))}
          {scanCompleted && (
            <button className="export-pdf-button" onClick={handleExportPDF}>Export PDF</button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrganizationPage;
