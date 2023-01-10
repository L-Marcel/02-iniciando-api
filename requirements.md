# Cadastro de carro

### **RF**: Requisitos funcionais
- Deve ser possível cadastrar um novo carro.

### **RN**: Regras de negócio
- Não deve ser possível cadastrar um carro com uma placa já existente;
- Não deve ser possível alterar a placa de um carro;
- O carro cadastrado deve estar disponível por padrão;
- Somente um administrador pode cadastrar um carro.

# Listagem de carros

### **RF**: Requisitos funcionais
- Deve ser possível listar os carros disponíveis;
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria;
- Deve ser possível listar todos os carros disponíveis pelo nome da marca;
- Deve ser possível listar todos os carros disponíveis pelo nome.

### **RN**: Regras de negócio
- O usuário não precisa estar logado no sistema.

# Cadastro de especificação do carro

### **RF**: Requisitos funcionais
- Deve ser possível cadastrar uma especificação para um carro.

### **RN**: Regras de negócio
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
- Não deve ser possível cadastrar uma especificação já existente para um mesmo carro.

# Cadastro de imagens do carro

### **RF**: Requisitos funcionais
- Deve ser possível cadastrar a imagem do carro.

### **RNF**: Requisitos não funcionais
- Utilizar o multer para upload dos arquivos.

### **RN**: Regras de negócio
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- Somente um administrador pode cadastrar a imagem de um carro.

# Aluguel de carro

### **RF**: Requisitos funcionais
- Deve ser possível cadastrar um aluguel.

### **RN**: Regras de negócio
- O aluguel deve ter duração mínima de 24 hora;
- Não deve ser possível cadastrar um novo aluguel caso já exista um para o mesmo carro;
- Não deve ser possível cadastrar um novo aluguel caso já exista um para o mesmo usuário.