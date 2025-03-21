import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp } from "lucide-react";
interface CalculatorResultsProps {
  isCalculated: boolean;
  purchaseAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  formatCurrency: (value: number) => string;
  schedule: Array<{
    month: number;
    payment: number;
    principalPayment: number;
    interestPayment: number;
    remainingBalance: number;
  }>;
}
const CalculatorResults: React.FC<CalculatorResultsProps> = ({
  isCalculated,
  purchaseAmount,
  monthlyPayment,
  totalPayment,
  totalInterest,
  formatCurrency,
  schedule
}) => {
  const [showSchedule, setShowSchedule] = useState(false);

  // Toggle amortization schedule visibility
  const toggleSchedule = () => {
    setShowSchedule(!showSchedule);
  };
  if (!isCalculated) {
    return <div className="flex items-center justify-center h-full min-h-[300px]">
        <div className="text-center space-y-4">
          <div className="text-calculator-foreground/40 text-sm">Insira os valores e clique em calcular para ver o resultado</div>
        </div>
      </div>;
  }
  return <AnimatePresence>
      <motion.div key="results" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.3,
      delay: 0.1
    }} className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-calculator-foreground/60 mb-1">
            Resultado
          </div>
          <motion.div initial={{
          scale: 0.9
        }} animate={{
          scale: 1
        }} transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }} className="text-2xl font-semibold text-calculator-accent">
            {formatCurrency(monthlyPayment)} <span className="text-base font-normal">/mês</span>
          </motion.div>
        </div>

        <Separator className="bg-calculator-border/60" />

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-calculator-foreground/70">Valor financiado:</span>
            <span className="font-medium">{formatCurrency(purchaseAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-calculator-foreground/70">Valor dos juros:</span>
            <span className="font-medium">{formatCurrency(totalInterest)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-calculator-foreground/70">Valor total:</span>
            <span className="font-medium">{formatCurrency(totalPayment)}</span>
          </div>
        </div>

        <Button variant="outline" onClick={toggleSchedule} className="w-full flex items-center justify-center gap-2 border-calculator-border hover:bg-calculator-muted/80">
          {showSchedule ? <>
              <ChevronUp size={16} />
              <span>Ocultar parcelas</span>
            </> : <>
              <ChevronDown size={16} />
              <span>Ver todas as parcelas</span>
            </>}
        </Button>

        <AnimatePresence>
          {showSchedule && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: "auto",
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} transition={{
          duration: 0.3
        }} className="overflow-hidden">
              <ScrollArea className="h-[240px] rounded-md border border-calculator-border">
                <div className="p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-calculator-foreground/70 border-b border-calculator-border">
                        <th className="pb-2 text-left">Mês</th>
                        <th className="pb-2 text-right">Parcela</th>
                        <th className="pb-2 text-right hidden md:table-cell">Amortização</th>
                        <th className="pb-2 text-right hidden md:table-cell">Juros</th>
                        <th className="pb-2 text-right">Saldo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map(item => <tr key={item.month} className="border-b border-calculator-border/40 last:border-0">
                          <td className="py-2 text-left">{item.month}</td>
                          <td className="py-2 text-right">
                            {formatCurrency(item.payment)}
                          </td>
                          <td className="py-2 text-right hidden md:table-cell">
                            {formatCurrency(item.principalPayment)}
                          </td>
                          <td className="py-2 text-right hidden md:table-cell">
                            {formatCurrency(item.interestPayment)}
                          </td>
                          <td className="py-2 text-right">
                            {formatCurrency(item.remainingBalance)}
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </motion.div>}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>;
};
export default CalculatorResults;