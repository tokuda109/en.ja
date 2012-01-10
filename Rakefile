namespace :post do
  desc "Given a title as an argument, create a new post file"
  task :new, [:title] do |t, args|
    filename = "#{Time.now.strftime('%Y-%m-%d')}-#{args.title.gsub(/\s/, '-').downcase}.markdown"
    path = File.join("_posts", filename)
    if File.exist? path; raise RuntimeError.new("Won't clobber #{path}"); end
    File.open(path, 'w') do |file|
      file.write <<-EOS
---
layout: post
category: 
title: "#{args.title}"
date: #{Time.now.strftime('%Y-%m-%d %k:%M:%S')}
---
EOS
    end
    puts "Now open #{path} in an editor."
  end
end

desc "Launch preview environment"
task :preview do
  system "jekyll --auto --server"
end

desc "Build site"
task :build do
  system "jekyll"
end

desc "Package app for production"
task :package do
  ENV['JEKYLL_ENV'] = 'production'
  
  Rake::Task["build"].invoke

  print "Compressing assets..."
  system "jammit -f -o assets -c _assets.yml"
  puts "done and now optipng"

  Rake::Task["optipng"].invoke
  puts "done. You can now deploy"
end

desc "Deploy Amazon s3 Using s3Sync"
task :deploy do
  system('s3sync -rpv _site/ newsletter.studiomohawk.com:')
end

desc "Optimise all PNG files with optipng"
task :optipng do
  Dir.glob("_site/**/*.png").each do |file|
    system "optipng -quiet -o7 #{file}"
  end
end
