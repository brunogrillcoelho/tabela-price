
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CalculatorResults from './CalculatorResults';

// Calculate monthly payment using Price Table formula
const calculateMonthlyPayment = (principal: number, interestRate: number, months: number): number => {
  // Convert annual interest rate to monthly decimal
  const monthlyRate = interestRate / 100;

  // Price table formula: PMT = P * [r(1+r)^n] / [(1+r)^n - 1]
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;

  // Avoid division by zero
  if (denominator === 0) return principal / months;
  return principal * (numerator / denominator);
};

// Calculate amortization schedule
const calculateAmortizationSchedule = (principal: number, interestRate: number, months: number) => {
  const monthlyRate = interestRate / 100;
  const monthlyPayment = calculateMonthlyPayment(principal, interestRate, months);
  const schedule = [];
  let remainingBalance = principal;
  for (let month = 1; month <= months; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
    schedule.push({
      month,
      payment: monthlyPayment,
      principalPayment,
      interestPayment,
      remainingBalance: Math.max(0, remainingBalance)
    });
  }
  return schedule;
};

const PriceCalculator = () => {
  const [purchaseAmount, setPurchaseAmount] = useState<number>(100);
  const [interestRate, setInterestRate] = useState<number>(1);
  const [months, setMonths] = useState<number>(3);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [fixedRate, setFixedRate] = useState<number | null>(null);
  const [maxMonths, setMaxMonths] = useState<number>(12);

  // Read URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Handle taxa (interest rate) parameter
    const taxaParam = urlParams.get('taxa');
    if (taxaParam) {
      const parsedRate = parseFloat(taxaParam);
      if (!isNaN(parsedRate) && parsedRate > 0) {
        setInterestRate(parsedRate);
        setFixedRate(parsedRate);
      }
    }
    
    // Handle parcelas (max months) parameter
    const parcelasParam = urlParams.get('parcelas');
    if (parcelasParam) {
      const parsedMaxMonths = parseInt(parcelasParam, 10);
      if (!isNaN(parsedMaxMonths) && parsedMaxMonths > 0) {
        setMaxMonths(parsedMaxMonths);
        
        // If current months is greater than new max, adjust it
        if (months > parsedMaxMonths) {
          setMonths(parsedMaxMonths);
        }
      }
    }
  }, []);

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Handle purchase amount input
  const handlePurchaseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPurchaseAmount(isNaN(value) ? 0 : value);
    setIsCalculated(false);
  };

  // Handle interest rate selection
  const handleInterestRateChange = (value: string) => {
    setInterestRate(parseFloat(value));
    setIsCalculated(false);
  };

  // Handle months slider
  const handleMonthsChange = (value: number[]) => {
    setMonths(value[0]);
    setIsCalculated(false);
  };

  // Calculate results
  const calculateResults = () => {
    if (purchaseAmount <= 0) return;
    const payment = calculateMonthlyPayment(purchaseAmount, interestRate, months);
    setMonthlyPayment(payment);
    const total = payment * months;
    setTotalPayment(total);
    const interest = total - purchaseAmount;
    setTotalInterest(interest);
    const amortizationSchedule = calculateAmortizationSchedule(purchaseAmount, interestRate, months);
    setSchedule(amortizationSchedule);
    setIsCalculated(true);
  };

  // Recalculate when inputs change
  useEffect(() => {
    if (isCalculated) {
      calculateResults();
    }
  }, [purchaseAmount, interestRate, months]);
  
  return <div className="w-full max-w-4xl mx-auto">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        <Card className="overflow-hidden border border-calculator-border bg-calculator-background shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="purchaseAmount" className="text-sm font-medium text-calculator-foreground">
                    Valor da compra
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-calculator-foreground/70">
                      R$
                    </span>
                    <Input id="purchaseAmount" type="number" min="0" step="100" value={purchaseAmount} onChange={handlePurchaseAmountChange} className="pl-8 h-12 bg-calculator-muted/50 border-calculator-border" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-calculator-foreground">
                    Taxa de juros mensal
                  </Label>
                  {fixedRate !== null ? (
                    <div className="h-12 flex items-center px-3 rounded-md border border-calculator-border bg-calculator-muted/50">
                      <span>{fixedRate}%</span>
                    </div>
                  ) : (
                    <RadioGroup value={interestRate.toString()} onValueChange={handleInterestRateChange} className="flex space-x-2">
                      {[1, 2, 3].map(rate => <Label key={rate} htmlFor={`rate-${rate}`} className={`flex-1 flex items-center justify-center h-12 rounded-md border transition-all duration-200 ${interestRate === rate ? "border-calculator-accent bg-calculator-accent/10 text-calculator-accent" : "border-calculator-border bg-calculator-muted/50 hover:bg-calculator-muted/80"}`}>
                          <RadioGroupItem value={rate.toString()} id={`rate-${rate}`} className="sr-only" />
                          {rate}%
                        </Label>)}
                    </RadioGroup>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium text-calculator-foreground">
                      Número de parcelas
                    </Label>
                    <span className="text-lg font-medium text-neutral-700">
                      {months}
                    </span>
                  </div>
                  <Slider value={[months]} min={2} max={maxMonths} step={1} onValueChange={handleMonthsChange} className="py-2" />
                  <div className="flex justify-between text-xs text-calculator-foreground/70">
                    <span>2 meses</span>
                    <span>{maxMonths} meses</span>
                  </div>
                </div>
                
                <Button 
                  onClick={calculateResults} 
                  className="w-full h-12 transition-all duration-300 font-extrabold text-neutral-700 bg-[#edff00] hover:bg-[#F4FF5C]"
                >
                  Calcular
                </Button>
              </div>
              
              <CalculatorResults isCalculated={isCalculated} purchaseAmount={purchaseAmount} monthlyPayment={monthlyPayment} totalPayment={totalPayment} totalInterest={totalInterest} formatCurrency={formatCurrency} schedule={schedule} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>;
};

export default PriceCalculator;
