"use client"

import { useState, useEffect } from "react"
import { Droplets, Leaf, Sun, Trophy, Plus, Camera, Settings, TrendingUp, Award, Target, Scissors, Search, CheckCircle2, Clock, MapPin, Mic } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AddPlantDialog } from "@/components/add-plant-dialog"
import { MissionGenerator } from "@/components/mission-generator"
import { PlantCareLog } from "@/components/plant-care-log"
import { WeatherWidget } from "@/components/weather-widget"

export default function PlantMissionApp() {
  const [darkMode, setDarkMode] = useState(false)
  const [plants, setPlants] = useState<any[]>([])
  const [missions, setMissions] = useState<any[]>([])
  const [completedMissions, setCompletedMissions] = useState<number[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [selectedPlant, setSelectedPlant] = useState<any>(null)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPlants = localStorage.getItem('plantmission-plants')
    const savedMissions = localStorage.getItem('plantmission-missions')
    const savedPoints = localStorage.getItem('plantmission-points')
    const savedStreak = localStorage.getItem('plantmission-streak')
    const savedCompleted = localStorage.getItem('plantmission-completed')

    if (savedPlants) setPlants(JSON.parse(savedPlants))
    if (savedMissions) setMissions(JSON.parse(savedMissions))
    if (savedPoints) setTotalPoints(parseInt(savedPoints))
    if (savedStreak) setCurrentStreak(parseInt(savedStreak))
    if (savedCompleted) setCompletedMissions(JSON.parse(savedCompleted))
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('plantmission-plants', JSON.stringify(plants))
  }, [plants])

  useEffect(() => {
    localStorage.setItem('plantmission-missions', JSON.stringify(missions))
  }, [missions])

  useEffect(() => {
    localStorage.setItem('plantmission-points', totalPoints.toString())
  }, [totalPoints])

  useEffect(() => {
    localStorage.setItem('plantmission-streak', currentStreak.toString())
  }, [currentStreak])

  useEffect(() => {
    localStorage.setItem('plantmission-completed', JSON.stringify(completedMissions))
  }, [completedMissions])

  const addPlant = (plant: any) => {
    setPlants(prev => [...prev, plant])
  }

  const updatePlant = (plantId: number, updates: any) => {
    setPlants(prev => prev.map(plant => 
      plant.id === plantId ? { ...plant, ...updates } : plant
    ))
  }

  const createMission = (mission: any) => {
    setMissions(prev => [...prev, mission])
  }

  const completeMission = (missionId: number, points: number) => {
    setCompletedMissions(prev => [...prev, missionId])
    setTotalPoints(prev => prev + points)
    setCurrentStreak(prev => prev + 1)
  }

  const urgentPlants = plants.filter(plant => plant.urgent || plant.nextWater === "Today" || plant.nextWater === "Overdue")

  const badges = [
    { name: "Green Thumb", icon: "🌱", unlocked: totalPoints >= 100, description: "Earn 100 points" },
    { name: "Water Master", icon: "💧", unlocked: completedMissions.length >= 10, description: "Complete 10 missions" },
    { name: "Plant Parent", icon: "🌿", unlocked: plants.length >= 5, description: "Care for 5 plants" },
    { name: "Streak Master", icon: "🔥", unlocked: currentStreak >= 7, description: "7-day streak" },
    { name: "Collection King", icon: "👑", unlocked: plants.length >= 10, description: "Own 10 plants" },
    { name: "Care Expert", icon: "⭐", unlocked: totalPoints >= 500, description: "Earn 500 points" },
  ]

  const monthlyStats = {
    missionsCompleted: completedMissions.length,
    totalMissions: missions.length,
    plantsWatered: plants.filter(p => p.lastWatered === "Today").length,
    streakRecord: currentStreak,
    pointsEarned: totalPoints,
  }

  return (
    <div
      className={`min-h-screen transition-colors ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-green-50 to-emerald-50"}`}
    >
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className={`text-3xl font-bold flex items-center gap-2 ${darkMode ? "text-green-400" : "text-green-800"}`}
            >
              <Leaf className="h-8 w-8" />
              PlantMission
            </h1>
            <p className={`${darkMode ? "text-green-300" : "text-green-600"}`}>Level up your plant parenting</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}>
                {totalPoints.toLocaleString()}
              </div>
              <div className={`text-sm ${darkMode ? "text-green-300" : "text-green-600"}`}>Total Points</div>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="missions">Missions</TabsTrigger>
            <TabsTrigger value="plants">My Plants</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Weather Widget */}
            <WeatherWidget darkMode={darkMode} />

            {/* Streak & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-4 text-center">
                  <div className={`text-3xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                    {currentStreak}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Day Streak 🔥</div>
                  <Progress value={currentStreak > 0 ? Math.min((currentStreak / 7) * 100, 100) : 0} className="mt-2" />
                </CardContent>
              </Card>

              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-4">
                  <Button className="w-full mb-2 bg-blue-600 hover:bg-blue-700">
                    <Droplets className="h-4 w-4 mr-2" />
                    Quick Water
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Camera className="h-4 w-4 mr-2" />
                    Scan Plant
                  </Button>
                </CardContent>
              </Card>

              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-4">
                  <div className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                    Today's Focus
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {urgentPlants.length > 0 ? `${urgentPlants.length} plants need attention` : "All plants are healthy!"}
                  </div>
                  <div className="flex gap-1 mt-2">
                    {urgentPlants.slice(0, 5).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-red-500 rounded-full"></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Missions */}
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                  <Target className="h-5 w-5 text-green-500" />
                  Active Missions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {missions.length === 0 ? (
                  <div className="text-center py-8">
                    <Target className={`h-12 w-12 mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
                    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                      No Active Missions
                    </h3>
                    <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
                      Add plants to start receiving care missions
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {missions.filter(m => !completedMissions.includes(m.id)).slice(0, 4).map((mission) => {
                      const IconComponent = mission.icon
                      
                      return (
                        <Card key={mission.id} className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-white"} ${mission.urgent ? "ring-2 ring-red-500" : ""}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className={`p-2 rounded-full ${mission.bgColor} ${mission.color}`}>
                                <IconComponent className="h-5 w-5` ${mission.color}`}>
                                <IconComponent className="h-5 w-5" />
                              </div>
                              {mission.urgent && (
                                <Badge variant="destructive" className="text-xs">
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                              {mission.title}
                            </h4>
                            <p className={`text-sm mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                              {mission.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {mission.difficulty}
                                </Badge>
                                <div className={`flex items-center gap-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                  <Clock className="h-3 w-3" />
                                  {mission.timeLeft}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-green-600">+{mission.points}</div>
                                <Button
                                  size="sm"
                                  onClick={() => completeMission(mission.id, mission.points)}
                                  className="mt-1 bg-green-600 hover:bg-green-700"
                                >
                                  Complete
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Urgent Plant Care */}
            {urgentPlants.length > 0 && (
              <Card className={`border-l-4 border-l-red-500 ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                    <Droplets className="h-5 w-5 text-red-500" />
                    Plants Needing Attention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {urgentPlants.slice(0, 3).map((plant) => (
                      <div
                        key={plant.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-red-50"}`}
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={plant.image || "/placeholder.svg"}
                            alt={plant.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <div className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                              {plant.name}
                            </div>
                            <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                              {plant.nextWater}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Droplets className="h-4 w-4 mr-1" />
                          Water
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mission Generator */}
            <MissionGenerator plants={plants} onCreateMission={createMission} darkMode={darkMode} />
          </TabsContent>

          <TabsContent value="missions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-green-800"}`}>All Missions</h2>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {missions.filter(m => !completedMissions.includes(m.id)).length} Active
                </Badge>
                <Badge variant="outline">{completedMissions.length} Completed</Badge>
              </div>
            </div>

            {/* Mission Categories */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card
                className={`cursor-pointer hover:shadow-md transition-shadow ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
              >
                <CardContent className="p-4 text-center">
                  <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>Watering Tasks</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {missions.filter(m => m.type === "watering" && !completedMissions.includes(m.id)).length} active
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer hover:shadow-md transition-shadow ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
              >
                <CardContent className="p-4 text-center">
                  <Scissors className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>Propagation</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {missions.filter(m => m.type === "pruning" && !completedMissions.includes(m.id)).length} active
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer hover:shadow-md transition-shadow ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
              >
                <CardContent className="p-4 text-center">
                  <Search className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>Health Checks</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {missions.filter(m => m.type === "inspection" && !completedMissions.includes(m.id)).length} active
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Mission List */}
            <div className="grid gap-4">
              {missions.map((mission) => {
                const isCompleted = completedMissions.includes(mission.id)
                const IconComponent = mission.icon

                return (
                  <Card key={mission.id} className={`${darkMode ? "bg-gray-800 border-gray-700" : ""} ${isCompleted ? "opacity-60" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full ${mission.bgColor} ${mission.color}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"} ${isCompleted ? "line-through" : ""}`}>
                              {mission.title}
                            </h3>
                            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                              {mission.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {mission.difficulty}
                              </Badge>
                              <div className={`flex items-center gap-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                <Clock className="h-3 w-3" />
                                {mission.timeLeft}
                              </div>
                              <div className="text-xs font-medium text-green-600">+{mission.points} points</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Mic className="h-4 w-4" />
                          </Button>
                          {isCompleted ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                          ) : (
                            <Button
                              onClick={() => completeMission(mission.id, mission.points)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Complete Mission
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="plants" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-green-800"}`}>
                My Plant Collection
              </h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Scan Plant
                </Button>
                <AddPlantDialog onAddPlant={addPlant} darkMode={darkMode} />
              </div>
            </div>

            {plants.length === 0 ? (
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-12 text-center">
                  <Leaf className={`h-20 w-20 mx-auto mb-6 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
                  <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    Start Your Plant Journey
                  </h3>
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-8 max-w-md mx-auto`}>
                    Add your first plant to begin tracking care schedules, receiving missions, and building your green
                    thumb skills.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <AddPlantDialog onAddPlant={addPlant} darkMode={darkMode} />
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Scan & Identify
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {plants.map((plant) => (
                  <Card
                    key={plant.id}
                    className={`hover:shadow-md transition-shadow cursor-pointer ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
                    onClick={() => setSelectedPlant(plant)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Image
                          src={plant.image || "/placeholder.svg"}
                          alt={plant.name}
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>{plant.name}</h3>
                          <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{plant.species}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              {plant.room}
                            </span>
                          </div>
                        </div>
                        {plant.urgent && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Health</span>
                            <span className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                              {plant.health}%
                            </span>
                          </div>
                          <Progress value={plant.health} className="h-2" />
                        </div>

                        <div className={`space-y-1 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          <div className="flex justify-between">
                            <span>Last watered:</span>
                            <span>{plant.lastWatered}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Next water:</span>
                            <span className={plant.urgent ? "text-red-500 font-medium" : "text-green-600 font-medium"}>
                              {plant.nextWater}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Next fertilize:</span>
                            <span>{plant.nextFertilize}</span>
                          </div>
                        </div>

                        {plant.notes && (
                          <div
                            className={`text-xs p-2 rounded ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-600"}`}
                          >
                            📝 {plant.notes}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Droplets className="h-3 w-3 mr-1" />
                            Water
                          </Button>
                          <Button size="sm" variant="outline">
                            <Camera className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mic className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Plant Care Log Modal */}
            {selectedPlant && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className={`max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Image
                          src={selectedPlant.image || "/placeholder.svg"}
                          alt={selectedPlant.name}
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                            {selectedPlant.name}
                          </h2>
                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {selectedPlant.species}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => setSelectedPlant(null)}>
                        Close
                      </Button>
                    </div>
                    <PlantCareLog plant={selectedPlant} onUpdatePlant={updatePlant} darkMode={darkMode} />
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-green-800"}`}>
              Your Plant Care Analytics
            </h2>

            {/* Monthly Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                    {monthlyStats.totalMissions > 0 ? Math.round((monthlyStats.missionsCompleted / monthlyStats.totalMissions) * 100) : 0}%
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Mission Success Rate</div>
                  <Progress
                    value={monthlyStats.totalMissions > 0 ? (monthlyStats.missionsCompleted / monthlyStats.totalMissions) * 100 : 0}
                    className="mt-2"
                  />
                </CardContent>
              </Card>

              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                    {monthlyStats.plantsWatered}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Plants Watered</div>
                  <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>This month</div>
                </CardContent>
              </Card>

              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${darkMode ? "text-orange-400" : "text-orange-600"}`}>
                    {monthlyStats.streakRecord}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Current Streak</div>
                  <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Days in a row</div>
                </CardContent>
              </Card>

              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
                    {monthlyStats.pointsEarned}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Points Earned</div>
                  <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Total</div>
                </CardContent>
              </Card>
            </div>

            {/* Plant Health Trends */}
            {plants.length > 0 && (
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Plant Health Overview
                  </CardTitle>
                  <CardDescription className={darkMode ? "text-gray-300" : ""}>
                    Health status of your plant collection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plants.map((plant) => (
                      <div key={plant.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={plant.image || "/placeholder.svg"}
                            alt={plant.name}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                          />
                          <span className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{plant.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={plant.health} className="w-20" />
                          <span className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                            {plant.health}%
                          </span>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl">🌱</AvatarFallback>
              </Avatar>
              <div>
                <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                  Plant Parent Level {Math.floor(totalPoints / 100) + 1}
                </h2>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Caring for {plants.length} plants</p>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={(totalPoints % 100)} className="w-32" />
                  <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {totalPoints % 100}% to Level {Math.floor(totalPoints / 100) + 2}
                  </span>
                </div>
              </div>
            </div>

            {/* Badge Collection */}
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                  <Award className="h-5 w-5 text-yellow-500" />
                  Badge Collection
                </CardTitle>
                <CardDescription className={darkMode ? "text-gray-300" : ""}>
                  {badges.filter((b) => b.unlocked).length} of {badges.length} badges unlocked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        badge.unlocked
                          ? darkMode
                            ? "bg-gray-700 border-green-500"
                            : "bg-green-50 border-green-200"
                          : darkMode
                            ? "bg-gray-700 border-gray-600 opacity-50"
                            : "bg-gray-50 border-gray-200 opacity-50"
                      }`}
                    >
                      <div className="text-2xl">{badge.icon}</div>
                      <div>
                        <div className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{badge.name}</div>
                        <div className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {badge.description}
                        </div>
                      </div>
                      {badge.unlocked && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                  <Settings className="h-5 w-5" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>Push Notifications</div>
                    <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Get reminders for plant care
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>Weather Alerts</div>
                    <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Receive weather-based care tips
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>Dark Mode</div>
                    <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Toggle dark theme</div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
