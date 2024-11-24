import React, { useState, useCallback } from "react";
import { SyncEvent, SyncState } from "../../../shared/types";
import CharacterCard from "./CharacterCard";
import {
  SyncContainer,
  StartButton,
  ProgressSection,
  ProgressBar,
  Stats,
  StatItem,
  CharacterGrid,
  SuccessMessage,
  ErrorMessage,
} from "../styles";
import { config } from "../config/environment";

const CharacterSync: React.FC = () => {
  const [state, setState] = useState<SyncState>({
    status: "idle",
    progress: 0,
    currentPage: 0,
    totalPages: 0,
    processedCharacters: 0,
    totalCharacters: 0,
    characters: [],
    error: null,
  });

  const charactersAPI = "api/characters/fetch";

  const startSync = useCallback(() => {
    setState((prev) => ({ ...prev, status: "fetching" }));
    const eventSource = new EventSource(`${config.serverUrl}/${charactersAPI}`);

    eventSource.onmessage = (event: MessageEvent) => {
      const data: SyncEvent = JSON.parse(event.data);

      switch (data.type) {
        case "progress":
          setState((prev) => ({
            ...prev,
            progress: data.percentage,
            currentPage: data.page,
            totalPages: data.totalPages,
            processedCharacters: data.processedData,
            totalCharacters: data.total,
            characters: [...prev.characters, ...data.resourceData],
          }));
          break;

        case "complete":
          setState((prev: SyncState) => ({
            ...prev,
            status: "completed",
          }));
          eventSource.close();
          break;

        case "error":
          setState((prev: SyncState) => ({
            ...prev,
            status: "error",
            error: data.message,
          }));
          eventSource.close();
          break;
      }
    };

    eventSource.onerror = () => {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: "Connection lost",
      }));
      eventSource.close();
    };
  }, []);

  return (
    <SyncContainer>
      {state.status === "idle" && (
        <StartButton onClick={startSync}>Start fetching Characters</StartButton>
      )}

      {state.status === "fetching" && (
        <ProgressSection>
          <ProgressBar value={state.progress} max="100" />
          <Stats>
            <StatItem>
              Page {state.currentPage} of {state.totalPages}
            </StatItem>
            <StatItem>
              Characters: {state.processedCharacters} of {state.totalCharacters}
            </StatItem>
            <StatItem>Progress: {state.progress}%</StatItem>
          </Stats>
          <CharacterGrid>
            {state.characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </CharacterGrid>
        </ProgressSection>
      )}

      {state.status === "completed" && (
        <SuccessMessage>
          <h2>Sync Complete!</h2>
          <p>Processed {state.processedCharacters} characters</p>
        </SuccessMessage>
      )}

      {state.status === "error" && (
        <ErrorMessage>
          <h2>Error</h2>
          <p>{state.error}</p>
        </ErrorMessage>
      )}
    </SyncContainer>
  );
};

export default CharacterSync;
