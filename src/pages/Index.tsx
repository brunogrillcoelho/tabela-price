import { motion } from 'framer-motion';
import PriceCalculator from '@/components/PriceCalculator';
const Index = () => {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      
      
      <PriceCalculator />
      
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 0.8,
      duration: 0.5
    }} className="mt-8 text-xs text-center text-muted-foreground">
        
        
      </motion.div>
    </div>;
};
export default Index;