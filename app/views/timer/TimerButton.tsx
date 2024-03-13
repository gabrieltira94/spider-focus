import { ViewTypes } from "@/app/dto/timer.dto";
import { StyledTimerButton } from "@/app/styling/timer/StyledTimerButton";

interface Props {
  view: ViewTypes;
  currentView: ViewTypes;
  setView: (view: ViewTypes) => void;
}

export default function TimerButton(props: Props) {
  const { view, currentView, setView } = props;

  const handleViewClick = () => setView(view);

  const getButtonVariant = (buttonView: ViewTypes) => {
    if (buttonView === currentView)
      return 'contained';

    return 'text';
  };

  const getButtonColor = (buttonView: ViewTypes) => {
    if (buttonView === currentView)
      return 'primary';

    return 'secondary';
  };

  const getText = () => {
    switch (view) {
      case ViewTypes.Pomodoro:
        return 'Pomodoro';
      case ViewTypes.ShortBreak:
        return 'Short break';
      case ViewTypes.LongBreak:
        return 'Long break';
    }
  };

  return (
    <StyledTimerButton
      variant={getButtonVariant(view)}
      color={getButtonColor(view)}
      onClick={handleViewClick}
    >
      {getText()}
    </StyledTimerButton>
  );
}