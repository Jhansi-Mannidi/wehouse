"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Camera, Pause, Play, Volume2, VolumeX, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CameraFeed {
  id: string
  name: string
  location: string
  status: "online" | "offline"
  lastActive: string
}

const cameras: CameraFeed[] = [
  { id: "cam1", name: "Camera 1", location: "Main Site", status: "online", lastActive: "Now" },
  { id: "cam2", name: "Camera 2", location: "Entrance", status: "online", lastActive: "Now" },
  { id: "cam3", name: "Camera 3", location: "Back Side", status: "offline", lastActive: "2 hours ago" },
]

export default function CameraPage() {
  const [selectedCamera, setSelectedCamera] = React.useState(cameras[0])
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [isMuted, setIsMuted] = React.useState(true)

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-white/10">
        <div className="flex items-center gap-3 px-4 h-14">
          <Link href="/customer">
            <Button variant="ghost" size="icon" className="bg-transparent text-white hover:bg-white/10">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="font-semibold text-lg text-white flex-1">Live Site Camera</h1>
          <Badge 
            variant="secondary" 
            className={cn(
              "border-0",
              selectedCamera.status === "online" 
                ? "bg-green-500/20 text-green-400" 
                : "bg-red-500/20 text-red-400"
            )}
          >
            {selectedCamera.status === "online" ? "LIVE" : "OFFLINE"}
          </Badge>
        </div>
      </header>

      <div className="flex flex-col">
        {/* Video Feed */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
          {/* Placeholder for actual video feed */}
          <div className="absolute inset-0 flex items-center justify-center">
            {selectedCamera.status === "online" ? (
              <div className="text-center">
                <div className="relative">
                  <Camera className="size-16 text-white/20 mx-auto" />
                  <div className="absolute -top-1 -right-1">
                    <span className="relative flex size-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full size-3 bg-red-500" />
                    </span>
                  </div>
                </div>
                <p className="text-white/40 text-sm mt-4">Live feed streaming...</p>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="size-16 text-white/10 mx-auto" />
                <p className="text-white/30 text-sm mt-4">Camera offline</p>
              </div>
            )}
          </div>

          {/* Live Indicator */}
          {selectedCamera.status === "online" && (
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-red-500" />
              </span>
              <span className="text-xs font-medium text-white bg-red-500/80 px-2 py-0.5 rounded">
                LIVE
              </span>
            </div>
          )}

          {/* Timestamp */}
          <div className="absolute top-4 right-4">
            <span className="text-xs text-white/70 bg-black/50 px-2 py-1 rounded">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 px-4 py-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-medium text-white">{selectedCamera.name}: {selectedCamera.location}</h2>
              <p className="text-xs text-white/50">Last active: {selectedCamera.lastActive}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20 text-white size-12 rounded-full"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20 text-white size-12 rounded-full"
              onClick={() => {}}
            >
              <Camera className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20 text-white size-12 rounded-full"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20 text-white size-12 rounded-full"
            >
              <Maximize2 className="size-5" />
            </Button>
          </div>
        </div>

        {/* Other Cameras */}
        <div className="px-4 py-4 bg-background">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Other Cameras</h3>
          <div className="space-y-2">
            {cameras.filter(c => c.id !== selectedCamera.id).map((camera) => (
              <Card 
                key={camera.id}
                className={cn(
                  "border cursor-pointer transition-all",
                  camera.status === "offline" && "opacity-60"
                )}
                onClick={() => camera.status === "online" && setSelectedCamera(camera)}
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <div className={cn(
                    "size-10 rounded-lg flex items-center justify-center",
                    camera.status === "online" ? "bg-green-100 dark:bg-green-900/30" : "bg-muted"
                  )}>
                    <Camera className={cn(
                      "size-5",
                      camera.status === "online" ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{camera.name}</p>
                    <p className="text-xs text-muted-foreground">{camera.location}</p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-[10px]",
                      camera.status === "online" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {camera.status === "online" ? "Online" : "Offline"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
