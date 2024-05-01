resource "azurerm_resource_group" "azure_pfe" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_redis_cache" "redis_pfe_devops" {
  name                = "redis-cache-devops"
  resource_group_name = azurerm_resource_group.azure_pfe.name
  location            = var.location
  sku_name            = "Basic"
  capacity            = 1
  family              = "C" 
}

resource "azurerm_postgresql_server" "postgres_pfe_devops" {
  name                = "postpfeserver"
  resource_group_name = azurerm_resource_group.azure_pfe.name
  location            = var.location
  sku_name            = "B_Gen5_1"
  version             = "11"
  administrator_login          = var.login
  administrator_login_password = var.loginpassword
  ssl_enforcement_enabled     = true 
}

resource "azurerm_postgresql_database" "postgres_pfe_devops" {
  name                = "project"
  resource_group_name = azurerm_resource_group.azure_pfe.name
  server_name         = azurerm_postgresql_server.postgres_pfe_devops.name
  charset             = "UTF8"
  collation           = "French_France.1252"
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
