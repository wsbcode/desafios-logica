import { Header, ControlBar } from './components/Header';
import { ChallengePanel } from './components/ChallengePanel';
import { EditorPanel } from './components/EditorPanel';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <ControlBar />
      <div className="flex-1 flex flex-row overflow-hidden max-w-[1600px] mx-auto w-full">
        <aside className="w-full md:w-5/12 lg:w-4/12 min-w-0 border-r border-slate-200 bg-white flex flex-col">
          <ChallengePanel />
        </aside>
        <main className="w-full md:w-7/12 lg:w-8/12 min-w-0 flex flex-col">
          <EditorPanel />
        </main>
      </div>
    </div>
  );
}

export default App;