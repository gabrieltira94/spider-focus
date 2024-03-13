'use client';

import dynamic from "next/dynamic";

import { SettingsProvider } from "@/app/hooks/SettingsContext";
import { TasksProvider } from "@/app/hooks/TasksContext";
import { TimerProvider } from "@/app/hooks/TimerContext";
import HeaderView from "@/app/views/header/HeaderView";
import TasksView from "@/app/views/tasks/TasksView";
import TimerView from "@/app/views/timer/TimerView";
import { StyledAppContainer } from "@/app/styling/StyledAppContainer";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/app/styling/theme";
import { ToastContainer } from "react-toastify";

const NoSSRFSummaryView = dynamic(() => import('@/app/views/summary/SummaryView'), { ssr: false });

export default function Page() {

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <StyledAppContainer>
        <SettingsProvider>

          <HeaderView />

          <TimerProvider>
            <TasksProvider>

              <TimerView />
              <TasksView />
              <NoSSRFSummaryView />

            </TasksProvider>
          </TimerProvider>
        </SettingsProvider>
      </StyledAppContainer>
    </ThemeProvider>
  );
};