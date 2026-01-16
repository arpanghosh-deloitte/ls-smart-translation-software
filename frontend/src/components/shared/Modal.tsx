import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave?: () => void;
  saveLabel?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  title,
  children,
  onSave,
  saveLabel = "Save",
  maxWidth = "sm"
}) => {
  return (
    <Dialog 
        open={open} 
        onClose={onClose} 
        fullWidth 
        maxWidth={maxWidth}
        PaperProps={{
            sx: { 
              borderRadius: 2, 
              padding: 1,
              backgroundColor: '#ffffff'
            }
        }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        pb: 1,
        backgroundColor: '#ffffff'
      }}>
        <Typography variant="h6" fontWeight={700} sx={{ color: '#000000' }}>
            {title}
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: '#000000' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ 
        borderColor: '#f0f0f0',
        backgroundColor: '#ffffff',
        color: '#000000'
      }}>
        <Box sx={{ mt: 1 }}>
            {children}
        </Box>
      </DialogContent>

      <DialogActions sx={{ 
        pt: 2, 
        pb: 1, 
        px: 3,
        backgroundColor: '#ffffff'
      }}>
        <Button onClick={onClose} color="inherit" sx={{ 
          textTransform: 'none', 
          fontWeight: 600,
          color: '#000000'
        }}>
          Cancel
        </Button>
        {onSave && (
          <Button 
            onClick={onSave} 
            variant="contained" 
            color="primary"
            sx={{ 
              textTransform: 'none', 
              fontWeight: 600, 
              px: 3,
              backgroundColor: '#4CAF50',
              '&:hover': { backgroundColor: '#45a049' }
            }}
          >
            {saveLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
