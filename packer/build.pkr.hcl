build {
  name    = "packer-build"
  sources = ["source.googlecompute.centOS"]
  provisioner "shell" {
    script = "./provisioner_script.sh"
  }
}