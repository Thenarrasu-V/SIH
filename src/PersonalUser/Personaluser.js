import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import './PersonalUser.css';

const PersonalUser = () => {
  const [scanStarted, setScanStarted] = useState(false);
  const [scanResults, setScanResults] = useState({
    passwordPolicies: null,
    softwareUpdates: null,
    firewallSettings: null,
    antivirusProtection: null,
  });
  const [scanCompleted, setScanCompleted] = useState(false);

  useEffect(() => {
    if (scanStarted) {
      // Simulate scan with delays for each item
      setTimeout(() => setScanResults((prev) => ({ ...prev, passwordPolicies: true })), 1000);
      setTimeout(() => setScanResults((prev) => ({ ...prev, softwareUpdates: true })), 2000);
      setTimeout(() => setScanResults((prev) => ({ ...prev, firewallSettings: false })), 3000); // Simulate unsafe setting
      setTimeout(() => {
        setScanResults((prev) => ({ ...prev, antivirusProtection: true }));
        setScanCompleted(true); // Mark scan as completed
      }, 4000);
    }
  }, [scanStarted]);

  const handleScanClick = () => {
    setScanStarted(true);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFont('helvetica');
    doc.setFontSize(16);
    doc.text('Scan Results', 10, 10);

    doc.setFontSize(12);
    doc.text('Password Policies: ✔ Safe', 10, 20);
    doc.text('Software Updates: ✔ Safe', 10, 30);
    doc.text('Firewall Settings: ✖ Unsafe', 10, 40);

    doc.setFontSize(10);
    const firewallDetails = 
      'The firewall is disabled, which makes your system vulnerable to external attacks. ' +
      'Mitigation Strategy: Enable the firewall through your system settings to block unauthorized access.';
    doc.text(firewallDetails, 10, 50, { maxWidth: 180 });

    doc.setFontSize(12);
    doc.text('Antivirus Protection: ✔ Safe', 10, 70);

    doc.save('Scan_Results.pdf');
  };

  return (
    <div className="personal-user-container">
      <div className="content-container">
        {!scanStarted ? (
          <>
            <p className="scan-description">
              To ensure your system's security, please scan your laptop for any potential vulnerabilities.
            </p>
            <button className="scan-button" onClick={handleScanClick}>
              Start Scan
            </button>
          </>
        ) : (
          <div className="scan-results">
            <div className="scan-item">
              <span>Password Policies</span>
              <span className={scanResults.passwordPolicies !== null ? (scanResults.passwordPolicies ? 'tick' : 'cross') : 'loading'}>
                {scanResults.passwordPolicies !== null ? (scanResults.passwordPolicies ? '✔' : '✖') : '...'}
              </span>
            </div>
            <div className="scan-item">
              <span>Software Updates</span>
              <span className={scanResults.softwareUpdates !== null ? (scanResults.softwareUpdates ? 'tick' : 'cross') : 'loading'}>
                {scanResults.softwareUpdates !== null ? (scanResults.softwareUpdates ? '✔' : '✖') : '...'}
              </span>
            </div>
            <div className="scan-item">
              <span>Firewall Settings</span>
              <span className={scanResults.firewallSettings !== null ? (scanResults.firewallSettings ? 'tick' : 'cross') : 'loading'}>
                {scanResults.firewallSettings !== null ? (scanResults.firewallSettings ? '✔' : '✖') : '...'}
              </span>
            </div>
            <div className="scan-item">
              <span>Antivirus Protection</span>
              <span className={scanResults.antivirusProtection !== null ? (scanResults.antivirusProtection ? 'tick' : 'cross') : 'loading'}>
                {scanResults.antivirusProtection !== null ? (scanResults.antivirusProtection ? '✔' : '✖') : '...'}
              </span>
            </div>
            {scanCompleted && (
              <button className="export-pdf-button" onClick={handleExportPDF}>
                Export PDF
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalUser;
