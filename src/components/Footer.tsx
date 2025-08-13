import { TrendingUp, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur">
      <div className="container px-4 py-8 max-w-[1440px] mx-auto">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CoinSwtich
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your comprehensive cryptocurrency dashboard for tracking,
              analyzing, and managing digital assets.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Markets</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Bitcoin
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Ethereum
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Binance Coin
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cardano
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Portfolio Tracker
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Price Alerts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Market Analysis
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Connect</h4>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Stay updated with market trends and platform updates.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © 2024 CoinSwitch. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-muted-foreground mt-4 sm:mt-0">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
