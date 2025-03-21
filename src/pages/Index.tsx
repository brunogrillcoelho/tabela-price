import { motion } from 'framer-motion';
import PriceCalculator from '@/components/PriceCalculator';
const Index = () => {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }} className="text-center mb-8 max-w-2xl">
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.2,
        duration: 0.5
      }} className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full">SIMULAÇÃO DE PARCELAMENTO</motion.div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          Calculadora Tabela Price
        </h1>
        <p className="text-muted-foreground">Simule sua compra parcelada.</p>
      </motion.div>
      
      <PriceCalculator />
      
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 0.8,
      duration: 0.5
    }} className="mt-8 text-xs text-center text-muted-foreground">
        <p>Esta calculadora utiliza o sistema de amortização Tabela Price com entrada zero.</p>
        <p>Os valores são apenas para simulação e podem variar conforme condições específicas.</p>
      </motion.div>
    </div>;
};
export default Index;