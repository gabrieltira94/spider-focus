import { Task } from "@/app/dto/task.dto";
import { ViewTypes } from "@/app/dto/timer.dto";
import { getPaddedNumber } from "@/app/utils/timeHelper";

interface Props {
  minutes: number;
  seconds: number;
  view: ViewTypes;
  activeTask: Task | null;
}

export default function Metadata(props: Props) {
  const { minutes, seconds, view, activeTask } = props;

  const getTitle = () => {

    let title = `${getPaddedNumber(minutes)}:${getPaddedNumber(seconds)} - `;

    switch (view) {
      case ViewTypes.Pomodoro: {
        if (activeTask)
          title += activeTask.title;
        else
          title += 'Focus time';

        break;
      }
      case ViewTypes.ShortBreak: {
        title += 'Time for quick charge';

        break;
      }
      case ViewTypes.LongBreak: {
        title += 'Enjoy your long break';

        break;
      }
      default: {
        title += "Do one thing at once";
      }
    }

    return title;
  };

  const getFavIcon = () => {
    if (view === ViewTypes.Pomodoro)
      return 'favicon.ico';

    return 'favicon-sg.png';
  };

  return (
    <>
      <title>{getTitle()}</title>
      <meta name="description" content="Context Switching done in the right way" />
      <link rel="shortcut icon" type="image/png" href={getFavIcon()} sizes="16x16"></link>
      <link rel="manifest" href="/manifest.json" />
    </>
  );
};