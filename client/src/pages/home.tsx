import heroImage from "@assets/image_1770717807238.png";
import heroImage2 from "@assets/image_1770717836504.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(215,40%,12%)]">
      <img
        src={heroImage}
        alt="SNJB Website Preview"
        className="w-full block"
      />
      <img
        src={heroImage2}
        alt="SNJB Website Preview 2"
        className="w-full block"
      />
    </div>
  );
}
