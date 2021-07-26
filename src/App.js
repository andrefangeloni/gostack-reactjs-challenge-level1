import React from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = React.useState([]);

  React.useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: 'https://github.com/andrefangeloni/gostack-reactjs-challenge-level1',
      techs: ['ReactJS']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const filteredRepos = repositories.filter((repo) => repo.id !== id);
    setRepositories(filteredRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
