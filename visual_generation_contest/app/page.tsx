import fs from "fs";
import path from "path";
import Image from "next/image";

export default function Home() {
  const examplesDir = path.join(process.cwd(), "public", "examples");
  const subdirs = fs
    .readdirSync(examplesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const puzzleData = subdirs.map((subdir) => {
    const subdirPath = path.join(examplesDir, subdir);
    const files = fs.readdirSync(subdirPath);
    const puzzleFiles = {
      output: files.find((file) => file.includes("output")),
      reveal: files.find((file) => file.includes("reveal")),
      solution: files.find((file) => file.includes("solution")),
    };
    return {
      name: subdir,
      ...puzzleFiles,
    };
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-20">
          <h1 className="text-5xl font-bold mb-6 text-center">
            Global Geometric Constraints Within The Diffusion Process to Break the Static Frame 
          </h1>
        </section>
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Infinitely Looping Image
          </h1>
          <div className="flex justify-center">
            <video
              src="/examples/scroll.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-w-4xl rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section>
          <h1 className="text-4xl font-bold mb-10 text-center">
            Images as Puzzles
          </h1>
          <div className="space-y-16">
            {puzzleData.map((puzzle, index) => (
              <div key={index} className="border-t border-gray-700 pt-10">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  {puzzle.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {puzzle.output && (
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl mb-3">Original</h3>
                      <Image
                        src={`/examples/${puzzle.name}/${puzzle.output}`}
                        alt={`${puzzle.name} - Output`}
                        width={512}
                        height={512}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  {puzzle.reveal && (
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl mb-3">Solving</h3>
                      <video
                        src={`/examples/${puzzle.name}/${puzzle.reveal}`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full max-w-md rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  {puzzle.solution && (
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl mb-3">Solution</h3>
                      <Image
                        src={`/examples/${puzzle.name}/${puzzle.solution}`}
                        alt={`${puzzle.name} - Solution`}
                        width={512}
                        height={512}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}