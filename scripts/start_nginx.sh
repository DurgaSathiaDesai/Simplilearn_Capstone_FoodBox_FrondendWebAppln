#!/bin/bash
# starting service
systemctl reload nginx
systemctl restart nginx
chmod 755 /home/ec2-user