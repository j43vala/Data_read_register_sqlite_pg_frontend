import os

def set_hostname(new_hostname):
    if os.geteuid() != 0:
        raise RuntimeError("This script must be run as root!")

    existing_hostname = None

    # Read /etc/hostname
    try:
        with open("/etc/hostname", "r") as hostname_file:
            existing_hostname = hostname_file.read().strip()
    except FileNotFoundError:
        pass

    if existing_hostname == new_hostname:
        print("Hostname is already set correctly.")
        return

    if existing_hostname:
        print(f"Changing hostname from {existing_hostname} to {new_hostname}")
    else:
        print(f"Setting hostname to {new_hostname}")

    # Write new hostname to /etc/hostname
    with open("/etc/hostname", "w") as hostname_file:
        hostname_file.write(new_hostname + "\n")

    # Update /etc/hosts
    hosts_entries = [
        ("127.0.0.1", "localhost"),
        ("::1", "localhost ip6-localhost ip6-loopback"),
    ]

    with open("/etc/hosts", "r") as hosts_file:
        content = hosts_file.readlines()

    found_old_hostname = any(current_hostname in line for line in content for current_hostname in (existing_hostname, new_hostname))

    if found_old_hostname:
        for line in content:
            if existing_hostname in line:
                index = content.index(line)
                content[index] = line.replace(existing_hostname, new_hostname).strip("\n")
                break
    else:
        for address, aliases in hosts_entries:
            content.append(f"{address}\t{new_hostname} {aliases}\n")

    with open("/etc/hosts", "w") as hosts_file:
        hosts_file.writelines(content)

if __name__ == "__main__":
    set_hostname("wzero")