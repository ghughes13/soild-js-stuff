import {
  createSignal,
  createResource,
  createEffect,
  For,
  Show,
} from "solid-js";
import styles from "./App.module.css";
import Card from "./Card";

function App() {
  const [selectedCharacter, setSelectedCharacter] = createSignal("fork");
  const [characters, setCharacters] = createSignal(null);

  const selectCharacter = (mal_id) => {
    setSelectedCharacter(mal_id);
    fetchCharacters();
  };

  const fetchCharacters = async () => {
    const characterRequests = [
      fetch("https://api.jikan.moe/v4/random/characters"),
      fetch("https://api.jikan.moe/v4/random/characters"),
    ];

    const responses = await Promise.all(characterRequests);
    const characters = await Promise.all(responses.map((res) => res.json()));

    setCharacters(characters);
  };

  createEffect(() => {
    fetchCharacters();
    setSelectedCharacter(null);
    console.log(selectedCharacter);
  });

  return (
    <div class={styles.App}>
      <div class={styles.cards}>
        <Show when={characters()} fallback={<div>Loading...</div>}>
          <For each={characters()}>
            {(character) => {
              const { name, images, mal_id } = character.data;
              return (
                <Card
                  characterName={name}
                  imageUrl={images?.jpg.image_url}
                  mal_id={mal_id}
                  selectCharacter={selectCharacter}
                />
              );
            }}
          </For>
        </Show>
      </div>
    </div>
  );
}

export default App;
