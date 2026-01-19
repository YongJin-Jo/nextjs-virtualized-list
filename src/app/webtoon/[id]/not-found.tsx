import Link from "next/link";
import { SadFaceIcon } from "@/components/common";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <SadFaceIcon size={80} style={{ marginBottom: "24px" }} />
      <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>
        웹툰을 찾을 수 없습니다
      </h1>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
        요청하신 웹툰이 존재하지 않거나 삭제되었습니다.
      </p>
      <Link
        href="/"
        style={{
          padding: "12px 24px",
          fontSize: "14px",
          fontWeight: 500,
          color: "#fff",
          backgroundColor: "#000",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        목록으로 돌아가기
      </Link>
    </div>
  );
}
