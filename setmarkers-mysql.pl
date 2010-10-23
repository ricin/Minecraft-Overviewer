#!/usr/bin/perl
use strict;
use POSIX;
use DBI;

my $dbhost="localhost";
my $dbname="minecraft"; 
my $dbuser="hey0mc";
my $dbpass="b8yDWz2uN76WZ4v2";

my $dbh = DBI->connect("DBI:mysql:$dbname", $dbuser, $dbpass) || die "Could not connect to database: $DBI::errstr";

my $sql="select \`name\`,\`group\`,\`x\`,\`y\`,\`z\` from warps";
# print "$sql\n";
my $sth = $dbh->prepare($sql);
$sth->execute();

my $str="var markerData=\[\n";
my @result=();
while(my $result=$sth->fetchrow_hashref()) {

	next if (($result->{'group'} =~ m/admin/) or ($result->{'group'} =~ m/mod/));

	my $x=floor($result->{'x'});
	my $y=floor($result->{'y'});
	my $z=floor($result->{'z'});
	$str.="	\{\"msg\": \"$result->{'name'}\", \"y\": $y, \"z\": $z, \"x\": $x\},\n";

}
chop($str);
chop($str);
print "$str\n\];\n";
