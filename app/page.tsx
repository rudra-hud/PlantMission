"use client"

import { useState } from "react"
import {
  Droplets,
  Leaf,
  Sun,
  Trophy,
  Plus,
  Camera,
  Settings,
  TrendingUp,
  Award,
  Target,
  Scissors,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PlantMissionApp() {
  const [darkMode, setDarkMode] = useState(false)
  const [plants, setPlants] = useState<any[]>([])
  const [missions, setMissions] = useState<any[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)

  const addPlant = () => {
    // Plant addition logic would go here
    console.log("Add plant functionality")
  }

  const createMission = () => {
    // Mission creation logic would go here
    console.log("Create mission functionality")
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
            {/* Weather Alert Placeholder */}
            <Card className={`border-l-4 border-l-blue-500 ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Sun className="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                      Weather Integration
                    </h3>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Connect weather data for smart plant care recommendations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Streak & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-4 text-center">
                  <div className={`text-3xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                    {currentStreak}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Day Streak</div>
                  <Progress value={currentStreak > 0 ? (currentStreak / 7) * 100 : 0} className="mt-2" />
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
                    {plants.length === 0 ? "Add your first plant!" : `${plants.length} plants in collection`}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Missions Section */}
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
                    <Button onClick={createMission} className="bg-green-600 hover:bg-green-700">
                      Create First Mission
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {missions.map((mission, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                          {mission.title}
                        </h4>
                        <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {mission.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weekly Challenge Placeholder */}
            <Card className={`border-l-4 border-l-purple-500 ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                  <Trophy className="h-5 w-5 text-purple-500" />
                  Weekly Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Weekly challenges will appear here once you have plants in your collection
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="missions" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-green-800"}`}>All Missions</h2>
              <Button onClick={createMission} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Mission
              </Button>
            </div>

            {/* Mission Categories */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card
                className={`cursor-pointer hover:shadow-md transition-shadow ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
              >
                <CardContent className="p-4 text-center">
                  <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>Watering Tasks</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Daily care missions</p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer hover:shadow-md transition-shadow ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
              >
                <CardContent className="p-4 text-center">
                  <Scissors className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>Propagation</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Growth projects</p>
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer hover:shadow-md transition-shadow ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
              >
                <CardContent className="p-4 text-center">
                  <Search className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>Health Checks</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Plant monitoring</p>
                </CardContent>
              </Card>
            </div>

            {/* Mission List */}
            {missions.length === 0 ? (
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-8 text-center">
                  <Target className={`h-16 w-16 mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    No Missions Yet
                  </h3>
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-6`}>
                    Start by adding plants to your collection to receive personalized care missions
                  </p>
                  <Button onClick={addPlant} className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Plant
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {missions.map((mission, index) => (
                  <Card key={index} className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                    <CardContent className="p-4">
                      <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>{mission.title}</h3>
                      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{mission.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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
                <Button onClick={addPlant} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Plant
                </Button>
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
                    <Button onClick={addPlant} className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Plant Manually
                    </Button>
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Scan & Identify
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {plants.map((plant, index) => (
                  <Card
                    key={index}
                    className={`hover:shadow-md transition-shadow ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Leaf className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>{plant.name}</h3>
                          <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{plant.species}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Health</span>
                          <span className={darkMode ? "text-white" : "text-gray-800"}>{plant.health}%</span>
                        </div>
                        <Progress value={plant.health} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-green-800"}`}>
              Your Plant Care Analytics
            </h2>

            {plants.length === 0 ? (
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardContent className="p-12 text-center">
                  <TrendingUp className={`h-16 w-16 mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    No Data Yet
                  </h3>
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Add plants and complete missions to see your care analytics and progress trends
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>0%</div>
                    <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Mission Success Rate
                    </div>
                  </CardContent>
                </Card>
                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>0</div>
                    <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Plants Watered</div>
                  </CardContent>
                </Card>
                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold ${darkMode ? "text-orange-400" : "text-orange-600"}`}>0</div>
                    <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Best Streak</div>
                  </CardContent>
                </Card>
                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold ${darkMode ? "text-purple-400" : "text-purple-600"}`}>0</div>
                    <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Points Earned</div>
                  </CardContent>
                </Card>
              </div>
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
                  Plant Parent Level 1
                </h2>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Caring for {plants.length} plants</p>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={0} className="w-32" />
                  <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>0% to Level 2</span>
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
                  Complete missions to unlock badges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Trophy className={`h-16 w-16 mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    No badges earned yet. Complete your first mission to start collecting!
                  </p>
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
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>Weather Alerts</div>
                    <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Receive weather-based care tips
                    </div>
                  </div>
                  <Switch />
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
