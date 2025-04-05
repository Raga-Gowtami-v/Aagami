
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Award, 
  Users, 
  Code, 
  Briefcase, 
  ChevronRight, 
  ArrowRight,
  BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { updateUserCoins } from "@/lib/firestoreService";
import { processPayment } from "@/lib/googleApis";

const LearnEarnPage = () => {
  const { userData } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEarnCoins = async (action: string, coinsToEarn: number) => {
    if (!userData) {
      toast({
        title: "Not logged in",
        description: "Please log in to earn coins",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      await updateUserCoins(userData.uid, coinsToEarn);
      toast({
        title: "Coins earned!",
        description: `You earned ${coinsToEarn} coins for ${action}`,
      });
    } catch (error: any) {
      toast({
        title: "Error earning coins",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRedeemCoins = async () => {
    if (!userData) {
      toast({
        title: "Not logged in",
        description: "Please log in to redeem coins",
        variant: "destructive"
      });
      return;
    }

    if ((userData.coins || 0) < 100) {
      toast({
        title: "Not enough coins",
        description: "You need at least 100 coins to redeem ₹10",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      await updateUserCoins(userData.uid, -100);
      await processPayment(10);
      toast({
        title: "Coins redeemed!",
        description: "100 coins have been redeemed for ₹10. Processing payment...",
      });
    } catch (error: any) {
      toast({
        title: "Error redeeming coins",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Learn & Earn</h1>
          <p className="text-gray-600">
            Enhance your skills while earning rewards for your progress and contributions
          </p>
        </div>
        
        <Card className="w-full md:w-auto mt-4 md:mt-0 bg-gradient-to-br from-aagami-sage/20 to-aagami-gold/10">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Your Balance</p>
              <p className="text-2xl font-bold">{userData?.coins || 0} Coins</p>
              <p className="text-xs text-gray-500">≈ ₹{Math.floor((userData?.coins || 0) / 10)}</p>
            </div>
            <Button 
              variant="outline" 
              className="ml-4 bg-white" 
              onClick={handleRedeemCoins}
              disabled={isProcessing || (userData?.coins || 0) < 100}
            >
              Redeem Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="border-2 border-aagami-blue/30 shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <BookOpen className="h-8 w-8 text-aagami-blue mb-2" />
            <CardTitle>Learn Essential Skills</CardTitle>
            <CardDescription>
              Master important academic and life skills with guided courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-1 text-aagami-blue" />
                Critical thinking & problem solving
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-1 text-aagami-blue" />
                Digital literacy & online safety
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-1 text-aagami-blue" />
                Effective communication skills
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-aagami-blue hover:bg-aagami-blue/90"
              onClick={() => handleEarnCoins("completing a skill lesson", 5)}
            >
              Start Learning <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-2 border-aagami-sage/30 shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <Award className="h-8 w-8 text-aagami-sage mb-2" />
            <CardTitle>Become a Certified Mentor</CardTitle>
            <CardDescription>
              Get certified and help fellow students while earning coins
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-1 text-aagami-sage" />
                Complete mentor training course
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-1 text-aagami-sage" />
                Pass certification assessment
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-1 text-aagami-sage" />
                Earn 50 coins upon certification
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-aagami-sage hover:bg-aagami-sage/90"
              onClick={() => handleEarnCoins("starting mentor certification", 10)}
            >
              Get Certified <BadgeCheck className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-2 border-aagami-terracotta/30 shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <Users className="h-8 w-8 text-aagami-terracotta mb-2" />
            <CardTitle>Mentor Your Juniors</CardTitle>
            <CardDescription>
              Help younger students with their studies and earn coins
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-1 text-aagami-terracotta" />
                1 hour of mentoring = 20 coins
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-1 text-aagami-terracotta" />
                Host study groups for extra coins
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-1 text-aagami-terracotta" />
                Earn badges for consistent mentoring
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-aagami-terracotta hover:bg-aagami-terracotta/90"
              onClick={() => handleEarnCoins("mentoring a junior", 20)}
            >
              Start Mentoring <Users className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-2 border-aagami-gold/30 shadow-md hover:shadow-lg transition-all">
          <CardHeader>
            <Briefcase className="h-8 w-8 text-aagami-gold mb-2" />
            <CardTitle>Freelance Opportunities</CardTitle>
            <CardDescription>
              Use your skills for small freelance tasks and earn coins
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-1 text-aagami-gold" />
                Content creation & digital art
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-1 text-aagami-gold" />
                Basic web development tasks
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-1 text-aagami-gold" />
                Translation & transcription work
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-aagami-gold hover:bg-aagami-gold/90"
              onClick={() => handleEarnCoins("completing a freelance task", 30)}
            >
              Find Tasks <Briefcase className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coins Earned</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Activity</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { rank: 1, name: "Priya Sharma", coins: 850, level: "Gold Mentor", activity: "Peer Mentoring" },
                  { rank: 2, name: "Rohit Kumar", coins: 720, level: "Silver Mentor", activity: "Content Creation" },
                  { rank: 3, name: "Ananya Singh", coins: 675, level: "Silver Mentor", activity: "Study Groups" },
                  { rank: 4, name: "Vikram Patel", coins: 590, level: "Bronze Mentor", activity: "Freelance Tasks" },
                  { rank: 5, name: "Meera Joshi", coins: 540, level: "Bronze Mentor", activity: "Skill Learning" }
                ].map((student, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.rank === 1 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-100 text-yellow-800 rounded-full">1</span>
                      ) : student.rank === 2 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-800 rounded-full">2</span>
                      ) : student.rank === 3 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-700 text-white rounded-full">3</span>
                      ) : (
                        student.rank
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.coins}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${student.level.includes("Gold") ? "bg-yellow-100 text-yellow-800" : 
                          student.level.includes("Silver") ? "bg-gray-100 text-gray-800" : 
                          "bg-yellow-700 text-white"}`}>
                        {student.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Unlock More Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Courses</CardTitle>
              <CardDescription>Learn in-demand skills</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Discover popular courses in programming, design, and digital marketing. Complete them to earn coins and certificates.</p>
            </CardContent>
            <CardFooter>
              <Link to="/student-dashboard/library">
                <Button variant="outline">Browse Courses</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mentorship Program</CardTitle>
              <CardDescription>Apply to become a mentor</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">If you excel in specific subjects, apply to our structured mentorship program to help others and earn substantial rewards.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Apply Now</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rewards Shop</CardTitle>
              <CardDescription>Redeem your coins</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Use your earned coins for cash rewards, education resources, or donate to support other students' education.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Visit Shop</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearnEarnPage;
