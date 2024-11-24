import { Character } from "../types";
import {
  CharacterCard as Card,
  CharacterImage,
  CharacterInfo,
  CharacterName,
  CharacterDetail,
  StatusIndicator,
} from "../styles";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => (
  <Card>
    <CharacterImage src={character.image} alt={character.name} />
    <CharacterInfo>
      <CharacterName>{character.name}</CharacterName>
      <CharacterDetail>
        <StatusIndicator status={character.status} />
        {character.status} - {character.species}
      </CharacterDetail>
      <CharacterDetail>Last known location:</CharacterDetail>
      <CharacterDetail>{character.location.name}</CharacterDetail>
    </CharacterInfo>
  </Card>
);

export default CharacterCard;
