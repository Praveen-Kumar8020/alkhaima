"use client";

import { useEffect, useRef } from "react";

// Move class outside of the component to fix React Hook ESLint rules
class Point {
    x: number;
    y: number;
    originX: number;
    originY: number;
    vx: number;
    vy: number;
    size: number;
    randomOffset: number; // For ambient floating
    distanceToMouse: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.vx = 0;
        this.vy = 0;
        // Elite subtle nodes
        this.size = Math.random() * 1.2 + 0.8;
        this.randomOffset = Math.random() * Math.PI * 2;
        this.distanceToMouse = 1000;
    }

    update(mouse: { x: number, y: number }, scrollY: number, time: number) {
        // 1. Ambient fluid floating (structural "breathing")
        const ambientX = Math.sin(time * 0.001 + this.randomOffset) * 5;
        const ambientY = Math.cos(time * 0.0012 + this.randomOffset) * 5;

        // Interactive distance from mouse pointer
        const dx = mouse.x - this.x;
        const dy = mouse.y - (this.y - scrollY * 0.2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.distanceToMouse = distance;

        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;

        // 2. Smooth, magnetic mouse repulsion wave (The "Elite" smoothness)
        // High radius for a wide, beautiful wave
        const maxDistance = 350;
        let force = 0;

        if (distance < maxDistance) {
            // Cubic ease-out for a much smoother push
            force = Math.pow(1 - distance / maxDistance, 3);
        }

        // Apply a gentle repulsion force
        const directionX = forceDirectionX * force * 15;
        const directionY = forceDirectionY * force * 15;

        // 3. Elastic spring back to origin
        const targetX = this.originX + ambientX;
        const targetY = this.originY + ambientY;

        this.vx += (targetX - this.x) * 0.015; // Spring tension
        this.vy += (targetY - this.y) * 0.015;

        // Apply repulsion
        if (distance < maxDistance) {
            this.vx -= directionX;
            this.vy -= directionY;
        }

        // Smooth friction
        this.vx *= 0.92;
        this.vy *= 0.92;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx: CanvasRenderingContext2D, scrollY: number) {
        // Render node
        ctx.beginPath();
        ctx.arc(this.x, this.y - scrollY * 0.2, this.size, 0, Math.PI * 2);

        // Dynamic coloring: nodes near the mouse glow brighter
        const glowRadius = 350;
        if (this.distanceToMouse < glowRadius) {
            const intensity = Math.pow(1 - (this.distanceToMouse / glowRadius), 2);
            ctx.fillStyle = `rgba(214, 211, 209, ${0.4 + intensity * 0.6})`; // Bright silver
            ctx.shadowBlur = 10 * intensity;
            ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
        } else {
            ctx.fillStyle = "rgba(168, 162, 158, 0.4)"; // Subtle stone background
            ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // Reset
    }
}

export default function BackgroundEffects() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scrollYRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
        let points: Point[] = [];

        const initPoints = () => {
            points = [];
            // Create a structural blueprint mesh grid
            // Optimized grid spacing to prevent lag while maintaining elite connected look
            const spacing = Math.min(width, height) / 8;

            // Overshoot the grid to cover parallax scrolling
            for (let x = -100; x < width + 100; x += spacing) {
                for (let y = -200; y < height + 800; y += spacing) {
                    // Slight randomization for organic architectural feel
                    const offsetX = (Math.random() - 0.5) * spacing * 0.6;
                    const offsetY = (Math.random() - 0.5) * spacing * 0.6;
                    points.push(new Point(x + offsetX, y + offsetY));
                }
            }
        };

        const drawLines = (scrollY: number) => {
            // Adjust connection distance proportionally to the new spacing
            const connectDistance = Math.min(width, height) / 6 + 20;
            const glowRadius = 350;

            ctx.lineWidth = 0.8;

            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // If nodes are close enough, draw structural connecting line
                    if (distance < connectDistance) {
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y - scrollY * 0.2);
                        ctx.lineTo(points[j].x, points[j].y - scrollY * 0.2);

                        // Base architectural line opacity based on distance between points
                        const baseOpacity = 0.2 * (1 - distance / connectDistance);

                        // Line illuminates if near mouse
                        const avgDistToMouse = (points[i].distanceToMouse + points[j].distanceToMouse) / 2;

                        if (avgDistToMouse < glowRadius) {
                            // The mouse acts as a "scanner" illuminating the blueprint
                            const intensity = Math.pow(1 - (avgDistToMouse / glowRadius), 2);
                            ctx.strokeStyle = `rgba(214, 211, 209, ${baseOpacity + intensity * 0.5})`; // Glows bright silver

                            // Only add shadow blur to highly active lines for performance
                            if (intensity > 0.4) {
                                ctx.shadowBlur = 5 * intensity;
                                ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
                            } else {
                                ctx.shadowBlur = 0;
                            }
                        } else {
                            // Standard background web
                            ctx.strokeStyle = `rgba(168, 162, 158, ${baseOpacity})`;
                            ctx.shadowBlur = 0;
                        }

                        ctx.stroke();
                    }
                }
            }
            ctx.shadowBlur = 0; // Reset
        };

        let animationFrameId: number;
        const animate = (time: number) => {
            ctx.clearRect(0, 0, width, height);

            const currentScrollY = scrollYRef.current;
            const maxScroll = Math.max(0, document.body.scrollHeight - height);

            // Fade logic to restrict effect to Home and Footer only
            let globalOpacity = 0;
            if (currentScrollY < height) {
                // Fade out as we scroll past Home
                globalOpacity = 1 - Math.pow(currentScrollY / height, 2);
            } else if (maxScroll > 0 && currentScrollY > maxScroll - (height * 1.5)) {
                // Fade in as we approach the Footer
                globalOpacity = 1 - (maxScroll - currentScrollY) / (height * 1.5);
            }

            // Clamp and optimize: If invisible, don't waste CPU/GPU tracing lines
            const clampedOpacity = Math.max(0, Math.min(1, globalOpacity));
            if (clampedOpacity <= 0.01) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            ctx.globalAlpha = clampedOpacity;

            // Smooth mouse trailing (easing) for elite feel
            mouse.x += (mouse.targetX - mouse.x) * 0.15;
            mouse.y += (mouse.targetY - mouse.y) * 0.15;

            // Update physics
            for (let i = 0; i < points.length; i++) {
                points[i].update(mouse, currentScrollY, time);
            }

            // Draw lines first so nodes sit on top of the structure
            drawLines(currentScrollY);

            // Draw nodes
            for (let i = 0; i < points.length; i++) {
                points[i].draw(ctx, currentScrollY);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initPoints();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
            // Immediate snap on first move if previously hidden
            if (mouse.x < 0) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            }
        };

        const handleMouseLeave = () => {
            // Sweep off-screen when mouse leaves
            mouse.targetX = -1000;
            mouse.targetY = -1000;
        };

        const handleScroll = () => {
            scrollYRef.current = window.scrollY;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("scroll", handleScroll);

        initPoints();
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full mix-blend-difference opacity-80"
            />
        </div>
    );
}
