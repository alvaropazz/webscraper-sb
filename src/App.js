import { AppWrapper } from "./styles";
import { Button } from "./components";
import { InfoGrid } from "./components";

function App() {
  return (
    <AppWrapper className="App" data-test-id="App">
      <Button text={"test"} />
      <InfoGrid
        title={"test"}
        rank={"test"}
        numberComments={"test"}
        points={"test"}
      />
    </AppWrapper>
  );
}

export default App;
