import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Crown, Sparkles, X } from 'lucide-react';
import { premiumFeatures, premiumPlans } from '../data/premiumContent';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubscribe = (planId: string) => {
    // Simulate purchase
    localStorage.setItem('premiumStatus', 'active');
    localStorage.setItem('premiumPlan', planId);
    localStorage.setItem('purchaseDate', new Date().toISOString());
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      onClose();
    }, 3000);
  };

  if (showConfirmation) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='bg-gray-900 rounded-2xl p-8 max-w-md w-full text-center border border-cyber-purple/30'
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className='w-16 h-16 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full flex items-center justify-center mx-auto mb-4'
            >
              <Sparkles className='w-8 h-8 text-white' />
            </motion.div>
            <h2 className='text-2xl font-bold text-white mb-2'>Welcome to Premium!</h2>
            <p className='text-gray-300 mb-4'>
              Your {selectedPlan} plan is now active. Enjoy unlimited access to all premium
              features!
            </p>
            <div className='flex justify-center'>
              <motion.button
                onClick={onClose}
                className='bg-gradient-to-r from-cyber-purple to-cyber-pink text-white px-6 py-3 rounded-xl font-semibold'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className='bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-cyber-purple/30'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-3xl font-bold text-white flex items-center gap-3'>
                <Crown className='w-8 h-8 text-cyber-purple' />
                Unlock Premium
              </h2>
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-white transition-colors'
              >
                <X className='w-6 h-6' />
              </button>
            </div>

            <div className='grid md:grid-cols-2 gap-8 mb-8'>
              <div>
                <h3 className='text-2xl font-bold text-cyber-purple mb-4'>Why Go Premium?</h3>
                <div className='space-y-4'>
                  {premiumFeatures.map(feature => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className='flex items-start gap-3 p-4 bg-black/20 rounded-lg border border-gray-700'
                    >
                      <div className='text-cyber-pink mt-1'>
                        {/* Icon would be rendered here, e.g., <feature.icon className="w-5 h-5" /> */}
                        <div className='w-5 h-5 bg-cyber-pink rounded'></div>
                      </div>
                      <div>
                        <h4 className='text-lg font-semibold text-white mb-1'>{feature.title}</h4>
                        <p className='text-gray-300 text-sm mb-2'>{feature.description}</p>
                        <ul className='text-gray-400 text-sm space-y-1'>
                          {feature.details.map((detail, index) => (
                            <li key={index} className='flex items-center gap-2'>
                              <Check className='w-3 h-3 text-green-400' />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className='text-2xl font-bold text-cyber-cyan mb-4'>Choose Your Plan</h3>
                <div className='space-y-4'>
                  {premiumPlans.map(plan => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPlan === plan.id
                          ? 'border-cyber-purple bg-cyber-purple/10'
                          : 'border-gray-700 bg-black/20 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <div className='flex items-center justify-between mb-3'>
                        <h4 className='text-xl font-semibold text-white'>{plan.name}</h4>
                        <span className='text-2xl font-bold text-cyber-pink'>{plan.price}</span>
                      </div>
                      <ul className='text-gray-300 text-sm space-y-1'>
                        {plan.features.map((feature, index) => (
                          <li key={index} className='flex items-center gap-2'>
                            <Check className='w-3 h-3 text-green-400' />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  onClick={() => handleSubscribe(selectedPlan)}
                  className='w-full mt-6 bg-gradient-to-r from-cyber-purple to-cyber-pink text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe Now
                </motion.button>
              </div>
            </div>

            <div className='text-center text-gray-400 text-sm'>
              <p>
                Cancel anytime. No hidden fees. Access premium features immediately after
                subscription.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
