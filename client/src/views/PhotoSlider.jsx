import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'Your Trip to Bali, Indonesia is on Royal Jordanian',
    imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    link: 'https://www.rj.com/',
  },
  {
    label: 'Luxurious Carmel Hotel - Your Home in Ramallah',
    imgPath: 'https://www.carmelhotel.ps//files/image/slider/5JUL3602-Pano_HDR.jpg',
    link: 'https://www.carmelhotel.ps/',
  },
  {
    label: "Jezzine Restaurant - Ramallah's Best Seafood!!",
    imgPath:'https://st7038.ispot.cc/images/22161/331297198_6139840872741430_7247942029885331817_n.jpg',
    link: 'http://www.bahri1976.com/?fbclid=IwY2xjawEy8q9leHRuA2FlbQIxMAABHRldoQoeG2DrHA6ThQcE3hCAE-h_7_pr2naTPmGY7vuqd9jxCWIp2Tbo2g_aem_Y-0exrt6XXnBbEkBFhc_BQ',
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Card sx={{ maxWidth: 400, overflow: 'hidden', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 50,
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Typography variant="subtitle1" align="center" sx={{fontWeight: 'bold'}}>
          {images[activeStep].label}
        </Typography>
      </CardContent>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <a href={step.link} target="_blank" rel="noopener noreferrer">
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              </a>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Card>
  );
}

export default SwipeableTextMobileStepper;
