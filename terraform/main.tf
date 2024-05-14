resource "azurerm_resource_group" "azure_pfe" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_redis_cache" "redis_pfe_devops" {
  name                = "rediscache-devopspfe"
  resource_group_name = azurerm_resource_group.azure_pfe.name
  location            = var.location
  sku_name            = "Basic"
  capacity            = 1
  family              = "C"
  enable_non_ssl_port = false
  
  redis_configuration {}
}


resource "azurerm_postgresql_flexible_server" "default" {
  name                   = var.db_name
  resource_group_name    = azurerm_resource_group.azure_pfe.name
  location               = azurerm_resource_group.azure_pfe.location
  version                = "14"
  administrator_login    = var.login
  administrator_password = var.loginpassword
  zone                   = "1"
  storage_mb             = 32768
  sku_name               = "B_Standard_B1ms"
  backup_retention_days  = 7
}

resource "azurerm_postgresql_flexible_server_database" "default" {
  name      = "project"
server_id = azurerm_postgresql_flexible_server.default.id
  collation = "en_US.utf8"
  charset   = "UTF8"
}


resource "azurerm_storage_account" "storage_pfe_devops" {
  name                     = "storagepfedevops"
  resource_group_name      = azurerm_resource_group.azure_pfe.name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "storagecontainer" {
  name                  = "images"
  storage_account_name  = azurerm_storage_account.storage_pfe_devops.name
  container_access_type = "blob"
}
