import { useState } from "react";
import QRCode from "qrcode";
import { useForm } from "react-hook-form";

export default function QRGenerator() {
  const { register, handleSubmit } = useForm();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState(null);

  const onSubmit = async (data) => {
    try {
      const canvas = await QRCode.toDataURL(data.text);
      setQrCodeDataUrl(canvas);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qrCodeDataUrl;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="qr-container">
      <h1 className="qr-heading">Generate Your Personal QR</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="qr-form">
        <input
          type="text"
          placeholder="Enter text to generate QR code"
          {...register("text", { required: true })}
          className="qr-input"
        />
        <button type="submit" className="qr-button">
          Generate
        </button>
      </form>
      {qrCodeDataUrl && (
        <div className="qr-output">
          <img
            src={qrCodeDataUrl}
            alt="Generated QR Code"
            className="qr-image"
          />
          <button onClick={downloadQR} className="qr-download-button">
            Download QR
          </button>
        </div>
      )}
    </div>
  );
}
