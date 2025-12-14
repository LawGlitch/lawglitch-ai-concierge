import { motion } from "framer-motion";

interface FloatingChatButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

const FloatingChatButton = ({ onClick, isVisible }: FloatingChatButtonProps) => {
  if (!isVisible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-gold rounded-full shadow-gold flex items-center justify-center z-40 group"
      aria-label="Open chat"
    >
      <i className="fas fa-comments text-secondary text-xl group-hover:scale-110 transition-transform" />
      
      {/* Pulse effect */}
      <span className="absolute w-full h-full rounded-full bg-primary animate-ping opacity-20" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-soft">
        Talk with Mira
      </span>
    </motion.button>
  );
};

export default FloatingChatButton;
