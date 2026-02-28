"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

const TOTAL_FRAMES = 40;

export default function MotorExplodeScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isReady, setIsReady] = useState(false);

    // Scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Add spring physics for buttery-smooth interpolation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100, // Speed of acceleration
        damping: 30,    // Resistance (higher = less bouncy/more smooth)
        restDelta: 0.001
    });

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loaded = 0;

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new window.Image();
            const frameNumber = String(i).padStart(3, "0");
            img.src = `/motorAnimated/ezgif-frame-${frameNumber}.jpg`;
            img.onload = () => {
                loaded++;
                setLoadedCount(loaded);
                if (loaded === TOTAL_FRAMES) {
                    setIsReady(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Canvas drawing
    useEffect(() => {
        if (!isReady || !canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const renderFrame = (frameIndex: number) => {
            const img = images[frameIndex];
            if (!img) return;

            // Sample edge color to fill the background (prevents ugly letterboxing)
            // First draw a 1x1 pixel from the top-left to get its color
            ctx.drawImage(img, 0, 0, 1, 1, 0, 0, 1, 1);
            const pixel = ctx.getImageData(0, 0, 1, 1).data;
            const bgColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

            // Fill entire canvas with that dynamically sampled background color
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Object-fit: contain logic (ensures full motor is visible on mobile)
            const scale = Math.min(
                canvas.width / img.width,
                canvas.height / img.height
            );
            const x = canvas.width / 2 - (img.width / 2) * scale;
            const y = canvas.height / 2 - (img.height / 2) * scale;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        // Handle resizing
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(Math.floor(scrollYProgress.get() * (TOTAL_FRAMES - 1)));
        };
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas(); // Set initial size

        // Subscribe to *smoothed* scroll updates
        const unsubscribe = smoothProgress.on("change", (latest) => {
            // Use requestAnimationFrame for smooth drawing
            requestAnimationFrame(() => {
                const frameIndex = Math.floor(latest * (TOTAL_FRAMES - 1));
                renderFrame(frameIndex);
            });
        });

        return () => {
            unsubscribe();
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [isReady, images, smoothProgress]);

    // --- Scroll Overlays opacities ---

    // Section 1: 0%–15%
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.15, 0.2], [1, 1, 0, 0]);

    // Section 2: 20%–40%
    const opacity2 = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);

    // Section 3: 45%–65%
    const opacity3 = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [0, 1, 1, 0]);

    // Section 4: 75%–95%
    const opacity4 = useTransform(scrollYProgress, [0.7, 0.75, 0.95, 1], [0, 1, 1, 0.5]);

    return (
        <div className="relative bg-[#0a0a0a]">
            {/* Preloader Overlay */}
            {!isReady && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-[#b87333]">
                    <div className="w-16 h-16 border-4 border-[#b87333]/30 border-t-[#b87333] rounded-full animate-spin mb-6"></div>
                    <h2 className="text-3xl tracking-widest uppercase font-heading">Loading</h2>
                    <p className="font-sans mt-2 text-white/60">
                        {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
                    </p>
                </div>
            )}

            {/* Scrollytelling Container */}
            <div ref={containerRef} className="h-[500vh] relative">
                <div className="sticky top-0 h-screen w-full overflow-hidden">

                    {/* Film Grain Texture Over the canvas */}
                    <div
                        className="absolute inset-0 z-10 opacity-30 pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                        }}
                    ></div>

                    {/* Gradient blending the bottom of the canvas into the page */}
                    <div className="absolute bottom-0 left-0 right-0 h-48 z-10 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"></div>

                    {/* Uniform dark overlay for text legibility */}
                    <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none"></div>

                    {/* Radial dark vignette for cinematic effect & edge legibility */}
                    <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)] pointer-events-none"></div>

                    {/* Canvas */}
                    <canvas ref={canvasRef} className="w-full h-full" />

                    {/* Text Overlays */}

                    {/* Section 1: 0% - 15% (Centered) */}
                    <motion.div
                        style={{ opacity: opacity1 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
                    >
                        <h1 className="text-5xl md:text-8xl text-white/90 drop-shadow-xl mb-4 font-heading leading-tight">
                            PRECISION REWOUND.
                        </h1>
                        <p className="text-lg md:text-2xl max-w-2xl text-white/60 drop-shadow-lg font-sans px-4">
                            Where copper meets craftsmanship — Patel Electronics.
                        </p>
                    </motion.div>

                    {/* Section 2: 20% - 40% (Top on mobile, Left on md) */}
                    <motion.div
                        style={{ opacity: opacity2 }}
                        className="absolute inset-0 z-20 flex flex-col justify-start md:justify-center pt-24 md:pt-0 px-6 md:px-24 items-center md:items-start text-center md:text-left"
                    >
                        <h2 className="text-4xl md:text-7xl text-white/90 drop-shadow-xl max-w-3xl mb-4 font-heading leading-tight">
                            LAYER BY LAYER<br className="hidden md:block" />ENGINEERING
                        </h2>
                        <p className="text-lg md:text-2xl max-w-xl text-white/60 drop-shadow-lg font-sans">
                            Every winding hand-calculated for maximum torque and efficiency.
                        </p>
                    </motion.div>

                    {/* Section 3: 45% - 65% (Bottom on mobile, Right on md) */}
                    <motion.div
                        style={{ opacity: opacity3 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-end md:items-end md:justify-center pb-24 md:pb-0 text-center md:text-right px-6 md:px-24"
                    >
                        <h2 className="text-4xl md:text-7xl text-white/90 drop-shadow-xl max-w-3xl mb-4 font-heading leading-tight">
                            THE HEART OF<br className="hidden md:block" />EVERY MACHINE
                        </h2>
                        <p className="text-lg md:text-2xl max-w-xl text-white/60 drop-shadow-lg font-sans">
                            Rotor, stator, bearings — rebuilt to factory spec and beyond.
                        </p>
                    </motion.div>

                    {/* Section 4: 75% - 95% (Centered + CTA) */}
                    <motion.div
                        style={{ opacity: opacity4 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
                    >
                        <h2 className="text-4xl md:text-7xl text-white/90 drop-shadow-xl mb-4 font-heading leading-tight">
                            BACK TO LIFE.<br className="hidden md:block" />BETTER THAN NEW.
                        </h2>
                        <p className="text-lg md:text-2xl max-w-2xl text-white/60 drop-shadow-lg mb-8 md:mb-10 font-sans">
                            Single phase, Three phase, DC motors — we rewind them all.
                        </p>
                        <button className="px-6 py-3 md:px-8 md:py-4 bg-[#b87333] hover:bg-[#a6652c] text-white tracking-widest uppercase transition duration-300 font-heading text-base md:text-lg rounded-sm shadow-xl cursor-pointer">
                            GET A QUOTE &rarr;
                        </button>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
