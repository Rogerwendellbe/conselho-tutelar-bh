# Conselho Tutelar de Belo Horizonte

Site acadêmico independente, em português, para orientar famílias e educadores sobre os direitos de crianças e adolescentes e os canais oficiais de atendimento em Belo Horizonte.

Esta versão é geral para BH e não está vinculada a uma escola específica. O site não recebe denúncias: encaminha o visitante para os serviços oficiais. Não inclua relatos de casos, dados pessoais ou imagens de crianças nas issues do repositório.

## Conteúdo

- Papel e atribuições do Conselho Tutelar.
- Direitos previstos no ECA e situações para procurar atendimento.
- Lista oficial dos Conselhos por regional e plantão centralizado.
- Disque 100, emergência 190 e orientações para famílias e educadores.
- Perguntas frequentes, fontes e data da revisão.

## Estrutura

```text
index.html                  página principal
cartaz.html                 cartaz A4, com aviso enquanto o QR Code não existe
css/style.css               estilos responsivos e impressão
js/config.js                link oficial e data da revisão
js/main.js                  menu, contraste, tamanho da fonte e perguntas
assets/                     favicon e imagem de compartilhamento
ferramentas/gerar_qrcode.py  geração local do QR Code após publicação
requirements.txt            dependência opcional para gerar o QR Code
```

## Executar localmente

Abra `index.html` no navegador. Para simular a publicação por HTTP, execute na raiz:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`. O site usa HTML, CSS e JavaScript sem etapa de build.

## Acessibilidade e privacidade

Há link para pular ao conteúdo, foco visível, controles de texto e alto contraste, perguntas com estados ARIA e suporte a movimento reduzido. Esses recursos não equivalem a uma certificação de conformidade integral com WCAG; uma auditoria completa permanece necessária.

O código não contém formulários, analytics ou cookies. Somente preferências de leitura ficam no `localStorage`. Ao abrir um serviço externo, aplicam-se as regras de privacidade daquele serviço. A hospedagem pode manter seus próprios registros de acesso.

## Publicação

O envio do código ao GitHub não ativa automaticamente um site. Para usar GitHub Pages, habilite `Settings > Pages > Deploy from a branch`, branch `main`, pasta `/(root)` e aguarde a confirmação da publicação. Teste o endereço retornado pelo GitHub antes de gerar o QR Code.

## QR Code e cartaz

```bash
python -m pip install -r requirements.txt
python ferramentas/gerar_qrcode.py https://ENDERECO-CONFIRMADO-DO-SITE/
```

São gerados `assets/qrcode.png` e `assets/qrcode-config.js`, usados pelo cartaz. Confirme que o código abre o site correto no celular. Depois abra `cartaz.html` e imprima em A4, sem cabeçalhos/rodapés do navegador e com gráficos de fundo ligados. Não distribua o cartaz enquanto ele exibir o aviso de QR Code pendente.

## Fontes e manutenção

- [ECA - Lei 8.069/1990](https://www.planalto.gov.br/ccivil_03/leis/l8069.htm)
- [Constituição Federal, art. 7º, XXXIII](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm)
- [Conselhos Tutelares de BH - Prefeitura](https://prefeitura.pbh.gov.br/direitos-humanos/conselho-tutelar)
- [Disque 100 - serviço oficial](https://www.gov.br/pt-br/servicos/denunciar-violacao-de-direitos-humanos)

Contatos e conteúdo revisados em 11/10/2026. Reconfira as fontes oficiais quando atualizar o site e altere a data em `js/config.js`. O plantão não substitui o telefone 190 em perigo imediato.

## Contexto acadêmico

Material desenvolvido para o tema de extensão “Desenvolvimento de sites ou aplicativos sobre Conselho Tutelar”, do curso de Análise e Desenvolvimento de Sistemas da UNIASSELVI. O repositório apresenta o produto técnico; não comprova execução comunitária, horas ou aprovação acadêmica.
