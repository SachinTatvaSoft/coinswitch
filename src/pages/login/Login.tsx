import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Eye, EyeOff, TrendingUp, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Images } from "../../assets/assets";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Images.heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/95" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-primary opacity-20 float-animation" />
        <div
          className="absolute top-40 right-20 w-16 h-16 rounded-full bg-crypto-blue/20 float-animation"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-crypto-green/20 float-animation"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-crypto-purple/20 float-animation"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex max-w-[1440px] mx-auto">
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl xl:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CoinWatch
              </h1>
              <p className="text-xl xl:text-2xl text-muted-foreground max-w-lg">
                Professional cryptocurrency tracking and portfolio management
                platform
              </p>
            </div>

            <div className="space-y-6 max-w-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Real-time Tracking</h3>
                  <p className="text-muted-foreground">
                    Live cryptocurrency prices and market data
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#16a249]/20 border-[#16a249]/20 border flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#16a249]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Secure & Private</h3>
                  <p className="text-muted-foreground">
                    Your data stays secure with bank-level encryption
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#e7b008]/20 border border-[#e7b008]/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#e7b008]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Lightning Fast</h3>
                  <p className="text-muted-foreground">
                    Instant updates and responsive interface
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CoinWatch
              </h1>
              <p className="text-muted-foreground mt-2">
                Welcome back to your crypto dashboard
              </p>
            </div>

            <Card className="glass-card border-border/50 shadow-card px-4 py-16">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">
                  Welcome Back
                </CardTitle>
                <CardDescription>
                  Sign in to your CoinWatch account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/50 border-border/50 focus:bg-background/80 transition-smooth"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-background/50 border-border/50 focus:bg-background/80 transition-smooth pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-border/50"
                      />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <a
                      href="#"
                      className="text-primary hover:text-primary-glow transition-smooth"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
