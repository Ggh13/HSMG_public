// S3TestPage.tsx
import React, { useState } from "react";

const S3_BUCKET = "8704c70f-c03aeba7-c79f-42d4-9cf3-e5299b186100";
const S3_REGION = "ru-1";
const S3_URL = `https://s3.twcstorage.ru/${S3_BUCKET}`;

export const S3TestPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setFileUrl(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const uploadUrl = `${S3_URL}/${file.name}`;

    try {
      const res = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!res.ok) {
        throw new Error(`Ошибка загрузки: ${res.status}`);
      }

      setFileUrl(`${S3_URL}/${file.name}`);
    } catch (err: any) {
      setError(err.message || "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!fileUrl || !file) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${S3_URL}/${file.name}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFileUrl(null);
        setFile(null);
      } else {
        throw new Error(`Ошибка удаления: ${res.status}`);
      }
    } catch (err: any) {
      setError(err.message || "Ошибка удаления");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>🔧 Загрузка файла в S3</h2>

      <input type="file" onChange={handleFileChange} />
      <br />
      <br />

      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Загрузка..." : "Загрузить"}
      </button>

      {fileUrl && (
        <>
          <div style={{ marginTop: "1rem" }}>
            <p>✅ Файл успешно загружен:</p>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              {fileUrl}
            </a>
          </div>

          {file?.type.startsWith("image/") && (
            <img
              src={fileUrl}
              alt="uploaded"
              style={{ maxWidth: "400px", marginTop: "1rem", border: "1px solid #ccc" }}
            />
          )}

          <br />
          <button onClick={handleDelete} disabled={loading}>
            Удалить файл
          </button>
        </>
      )}

      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}
    </div>
  );
};
