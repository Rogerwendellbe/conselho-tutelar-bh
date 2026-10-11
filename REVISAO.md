# Revisão do projeto

Revisão em 11/10/2026. Versão geral para Belo Horizonte, sem escola vinculada.

## Ajustes realizados

- Contatos não preenchidos substituídos pela lista oficial da PBH e pelo plantão centralizado.
- Removida atribuição de realização comunitária a uma escola não informada.
- Atualizado o texto sobre comunicação de suspeitas e atuação da rede de proteção.
- Removida alegação de conformidade integral WCAG sem auditoria.
- Corrigida rolagem horizontal em 320 px com fonte ampliada para 150%.
- Cartaz mostra aviso enquanto o QR Code não existe, sem imagem quebrada.
- Documentadas execução local, publicação e dependência opcional do gerador de QR Code.

## Verificações concluídas

- JavaScript sem erros de sintaxe e sem exceções nos testes do navegador.
- Nenhum arquivo estático ausente nas páginas testadas.
- Âncoras internas existentes e IDs únicos.
- Menu mobile abre, fecha após seleção e responde a Escape.
- Perguntas frequentes abrem e fecham.
- Alto contraste persiste após recarregar a página; aumento de fonte funciona.
- Contatos e respostas das perguntas continuam disponíveis sem JavaScript.
- Tela de 320 px com fonte ampliada não apresenta rolagem horizontal.
- Cartaz pendente exportado em uma página A4 no teste.
- Não foram identificadas credenciais ou dados pessoais de crianças nos arquivos revisados.

## Limitações

- Não houve auditoria integral de acessibilidade nem teste com leitor de tela.
- Não foi avaliada a execução comunitária ou aprovação acadêmica da extensão.
- O QR Code definitivo depende de um endereço de site publicado e confirmado.
- A geração do QR Code requer instalar a dependência opcional de requirements.txt; a sintaxe do gerador foi verificada, mas a geração definitiva permanece pendente.
- Publicar o código no GitHub não ativa automaticamente o GitHub Pages.

## Fontes consultadas

- ECA: https://www.planalto.gov.br/ccivil_03/leis/l8069.htm
- PBH: https://prefeitura.pbh.gov.br/direitos-humanos/conselho-tutelar
- Disque 100: https://www.gov.br/pt-br/servicos/denunciar-violacao-de-direitos-humanos
