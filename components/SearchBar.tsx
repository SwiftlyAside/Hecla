import React, { useState } from "react";
import { Form } from "semantic-ui-react";

interface searchBarProps {
  onFormSubmit: (term: string) => void;
}

const SearchBar: React.FC<searchBarProps> = ({ onFormSubmit }) => {
  const [term, setTerm] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFormSubmit(term);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <input
          type="text"
          placeholder="Music Search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
      </Form.Field>
    </Form>
  );
};

export default SearchBar;
