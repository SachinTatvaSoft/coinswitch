import { useState, type JSX } from "react";
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
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { login } from "../../slices/authSlice";
import { FE_ROUTE } from "../../config/app-routes";
import { VALID_EMAIL, VALID_PASSWORD } from "../../constant/constant";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange =
    (field: "email" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setError("");
    };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email && !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!formData.email) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    if (
      formData.email !== VALID_EMAIL ||
      formData.password !== VALID_PASSWORD
    ) {
      setError("Email and password do not match.");
      return;
    }

    setError("");
    if (error.length === 0) {
      dispatch(login());
      navigate(FE_ROUTE.DASHBOARD);
    }
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
              <FeatureItem
                icon={
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                }
                bg="bg-gradient-primary"
                title="Real-time Tracking"
                description="Live cryptocurrency prices and market data"
              />
              <FeatureItem
                icon={<Shield className="w-6 h-6 text-[#16a249]" />}
                bg="bg-[#16a249]/20 border-[#16a249]/20 border"
                title="Secure & Private"
                description="Your data stays secure with bank-level encryption"
              />
              <FeatureItem
                icon={<Zap className="w-6 h-6 text-[#e7b008]" />}
                bg="bg-[#e7b008]/20 border border-[#e7b008]/20"
                title="Lightning Fast"
                description="Instant updates and responsive interface"
              />
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
                  <div className="space-y-2 relative">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange("email")}
                      className="bg-background/50 border-border/50 focus:bg-background/80 transition-smooth"
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange("password")}
                        className="bg-background/50 border-border/50 focus:bg-background/80 transition-smooth pr-10"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full mt-6">
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

const FeatureItem = ({
  icon,
  bg,
  title,
  description,
}: {
  icon: JSX.Element;
  bg: string;
  title: string;
  description: string;
}) => (
  <div className="flex items-start space-x-4">
    <div
      className={`flex-shrink-0 w-12 h-12 rounded-lg ${bg} flex items-center justify-center`}
    >
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default Login;
