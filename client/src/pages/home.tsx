import heroImage from "@assets/image_1770717807238.png";
import heroImage2 from "@assets/image_1770717836504.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(215,40%,12%)] flex flex-col items-center justify-center p-6 gap-6">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-white/90 mb-2">SNJB College Website</h1>
        <p className="text-white/50 text-sm max-w-md mx-auto">
          The chatbot widget is available in the bottom-right corner. Click the chat icon to start a conversation.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 max-w-5xl w-full">
        <img
          src={heroImage}
          alt="SNJB Website Preview"
          className="rounded-lg border border-white/10 shadow-lg w-full lg:w-1/2 object-cover"
        />
        <img
          src={heroImage2}
          alt="SNJB Website Preview 2"
          className="rounded-lg border border-white/10 shadow-lg w-full lg:w-1/2 object-cover"
        />
      </div>
    </div>
  );
}
