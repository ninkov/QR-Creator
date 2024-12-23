import { useState } from "react";
import QRCode from "qrcode";
import { useForm } from 'react-hook-form';



export default function QRGenerator() {
  const { register, handleSubmit } = useForm()
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState(null);

  const onSubmit = async (data) => {
    try {
      const canvas = await QRCode.toDataURL(data.text);

      setQrCodeDataUrl(canvas);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  
  };

  return (
    <div>
      <h1>Generate Your Personal QR</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter text to generate QR code"
          {...register("text", { required: true })}
        />
        <button type="submit">Generate</button>
      </form>
      {qrCodeDataUrl && <img src={qrCodeDataUrl} alt="Generated QR Code" />}
    </div>
  );
}
