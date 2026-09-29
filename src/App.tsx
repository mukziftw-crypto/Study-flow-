import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Shell } from './components/layout/Shell';

// Views
import { DashboardView } from './views/DashboardView';
import { SubjectView } from './views/SubjectView';
import { TopicView } from './views/TopicView';
import { NotesNotebookView } from './views/NotesNotebookView';
import { QuestionBankView } from './views/QuestionBankView';
import { PracticeView } from './views/PracticeView';
import { MockTestView } from './views/MockTestView';
import { PatternPaperView } from './views/PatternPaperView';
import { MistakesView } from './views/MistakesView';
import { PlannerView } from './views/PlannerView';
import { ResourcesView } from './views/ResourcesView';
import { IBResourcesView } from './views/IBResourcesView';
import { ProgressView } from './views/ProgressView';
import { ResultsView } from './views/ResultsView';
import { QuestionAnalyticsView } from './views/QuestionAnalyticsView';
import { SettingsView } from './views/SettingsView';

const RouteRenderer: React.FC = () => {
  const { route } = useApp();

  switch (route) {
    case 'dashboard':
      return <DashboardView />;
    case 'subjects':
      return <SubjectView />;
    case 'topic':
      return <TopicView />;
    case 'notes':
      return <NotesNotebookView />;
    case 'question-bank':
      return <QuestionBankView />;
    case 'practice':
      return <PracticeView />;
    case 'mock-test':
      return <MockTestView />;
    case 'pattern-paper':
      return <PatternPaperView />;
    case 'mistakes':
      return <MistakesView />;
    case 'planner':
      return <PlannerView />;
    case 'resources':
      return <ResourcesView />;
    case 'ib-resources':
      return <IBResourcesView />;
    case 'progress':
      return <ProgressView />;
    case 'results':
      return <ResultsView />;
    case 'question-analytics':
      return <QuestionAnalyticsView />;
    case 'settings':
      return <SettingsView />;
    default:
      return <DashboardView />;
  }
};

export function App() {
  return (
    <AppProvider>
      <Shell>
        <RouteRenderer />
      </Shell>
    </AppProvider>
  );
}

export default App;
