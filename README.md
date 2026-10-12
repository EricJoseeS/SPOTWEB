# SpotWeb

Aplicação web com o player Audius original e uma página adicional para buscar vídeos do YouTube.

## Rodar localmente

Requer Node.js 20 ou superior.

```sh
npm ci
npm start
```

Abra `http://localhost:3000`. A busca do YouTube fica no link **YouTube** da navegação.

## Publicar no Render

Crie um Web Service no Render apontando para este repositório. O arquivo `render.yaml` define o runtime Node, a instalação com `npm install` e o comando de inicialização.

## Integração com YouTube

`youtubei.js` (Innertube) é usado no servidor para pesquisar e retornar metadados. A reprodução acontece no player oficial incorporado do YouTube. O projeto não extrai nem entrega URLs diretas de áudio/vídeo; o NewPipe Extractor não está incluído nessa integração.