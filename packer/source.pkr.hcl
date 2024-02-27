source "googlecompute" "centOS" {
  project_id          = var.project_id
  image_name          = "${var.image_name}"
  source_image_family = var.source_image_family
  zone                = var.zone
  machine_type        = var.machine_type
  ssh_username        = var.ssh_username
  tags                = ["packer"]
}

// locals {
//   current_time = lower(formatdate("DD-MMM-YY-hh-mm", timestamp()))
// -${local.current_time}
// }
