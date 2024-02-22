build {
  name    = "packer-build"
  sources = ["source.googlecompute.centOS"]

  provisioner "shell" {
    script = "./initial.sh"
  }

  provisioner "file" {
    source      = "../webapp.zip"
    destination = "/tmp/webapp.zip"
  }

  provisioner "shell" {
    script = "./unzip_script.sh"
  }

  provisioner "file" {
    source      = "../csye6225.service"
    destination = "/tmp/csye6225.service"
  }

  provisioner "shell" {
    script = "./systemd.sh"
  }


  provisioner "file" {
    source      = "./pg_user_setup.exp"
    destination = "/tmp/pg_user_setup.exp"
  }

  provisioner "shell" {
    inline = [
      "cd /tmp/",
      "ls -al",
      "pwd",
      "sudo chmod +x pg_user_setup.exp",
      "sudo expect pg_user_setup.exp ${var.pg_password}",
      "cd -",
      "sudo systemctl restart postgresql",
      "sudo setenforce 0"
    ]
  }

  provisioner "file" {
    source      = "./pg_hba.conf"
    destination = "/tmp/pg_hba.conf"
  }

  provisioner "shell" {
    inline = [
      "sudo mv -f /var/lib/pgsql/data/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf.bak",
      "sudo mv -f /tmp/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf",
      "sudo cat /var/lib/pgsql/data/pg_hba.conf",
      "sudo systemctl restart postgresql"
    ]
  }

  provisioner "shell" {
    script = "../bootstrap.sh"
  }

  provisioner "shell" {
    inline = [
      "sudo systemctl daemon-reload",
      "sudo systemctl enable csye6225.service",
    ]
  }
}